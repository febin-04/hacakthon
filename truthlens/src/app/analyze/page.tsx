'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  Link as LinkIcon, 
  File, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Check, 
  AlertCircle, 
  Play, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  X,
  Trash2,
  FileCheck,
  CheckCircle2,
  Loader2,
  AlertTriangle
} from 'lucide-react';

type IdentifiedMediaType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'UNKNOWN';

interface UploadedMediaState {
  file?: File;
  url?: string;
  name: string;
  identifiedType: IdentifiedMediaType;
  mimeType: string;
  sizeFormatted: string;
  previewUrl: string;
  dataUrl?: string;
}

export default function AnalyzePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [urlInputValue, setUrlInputValue] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<UploadedMediaState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const processingSteps = [
    '1. Uploading media',
    '2. Extracting media information',
    '3. Running AI analysis',
    '4. Checking metadata',
    '5. Checking source information',
    '6. Preparing results'
  ];

  const allowedImageExts = ['jpg', 'jpeg', 'png', 'webp'];
  const allowedVideoExts = ['mp4', 'mov', 'webm'];
  const allowedAudioExts = ['mp3', 'wav', 'm4a'];

  const detectMediaType = (fileName: string, mimeType: string): IdentifiedMediaType => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (mimeType.startsWith('image/') || allowedImageExts.includes(ext)) {
      return 'IMAGE';
    }
    if (mimeType.startsWith('video/') || allowedVideoExts.includes(ext)) {
      return 'VIDEO';
    }
    if (mimeType.startsWith('audio/') || allowedAudioExts.includes(ext)) {
      return 'AUDIO';
    }
    return 'UNKNOWN';
  };

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);
    const identifiedType = detectMediaType(file.name, file.type);

    if (identifiedType === 'UNKNOWN') {
      setErrorMessage(
        'Unsupported file format. Please upload an Image (JPG, PNG, WEBP), Video (MP4, MOV, WEBM), or Audio (MP3, WAV, M4A).'
      );
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 100 MB maximum threshold.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedMedia({
        file,
        name: file.name,
        identifiedType,
        mimeType: file.type || 'application/octet-stream',
        sizeFormatted: sizeMB,
        previewUrl: objectUrl,
        dataUrl: dataUrl,
      });
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read local media file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUrl = urlInputValue.trim();
    if (!trimmedUrl) {
      setErrorMessage('Please enter a valid media URL.');
      return;
    }

    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      setErrorMessage('URL must start with http:// or https://');
      return;
    }

    const fileName = trimmedUrl.split('/').pop()?.split('?')[0] || 'remote_media';
    const identifiedType = detectMediaType(fileName, '');

    setSelectedMedia({
      url: trimmedUrl,
      name: fileName.length > 35 ? fileName.substring(0, 35) + '...' : fileName,
      identifiedType: identifiedType === 'UNKNOWN' ? 'IMAGE' : identifiedType,
      mimeType: 'Public URL Resource',
      sizeFormatted: 'Remote Stream',
      previewUrl: trimmedUrl,
      dataUrl: trimmedUrl,
    });
  };

  const handleRemoveMedia = () => {
    setErrorMessage(null);
    if (selectedMedia?.previewUrl && selectedMedia.file) {
      URL.revokeObjectURL(selectedMedia.previewUrl);
    }
    setSelectedMedia(null);
  };

  const triggerAnalyze = async () => {
    if (!selectedMedia) return;
    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    // Prepare payload URL safely: do not send massive base64 video/audio buffers over HTTP JSON
    let payloadUrl = selectedMedia.url || '';
    if (selectedMedia.identifiedType === 'IMAGE') {
      if (selectedMedia.dataUrl && selectedMedia.dataUrl.length < 3 * 1024 * 1024) {
        payloadUrl = selectedMedia.dataUrl;
      }
    }

    // Fire backend API call with 4-second fast timeout guard
    const fetchController = new AbortController();
    const timeoutId = setTimeout(() => fetchController.abort(), 4000);

    const apiPromise = fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: fetchController.signal,
      body: JSON.stringify({
        mediaName: selectedMedia.name,
        mediaType: selectedMedia.identifiedType.toLowerCase(),
        fileSize: selectedMedia.sizeFormatted,
        url: payloadUrl,
      })
    })
      .then((res) => {
        clearTimeout(timeoutId);
        return res.json();
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.warn('API call fast fallback:', err);
        return null;
      });

    // Animate progress steps smoothly every 300ms
    let step = 0;
    const interval = setInterval(async () => {
      step++;
      if (step < processingSteps.length - 1) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setCurrentStepIndex(processingSteps.length - 1);

        // Await parallel API response (guaranteed fast response within 4s max)
        const data = await apiPromise;
        const apiResult = data && data.success ? data.result : null;

        // Use Blob URL or previewUrl for sessionStorage to avoid quota exceeded errors
        const uploadedRecord = {
          mediaName: selectedMedia.name,
          mediaType: selectedMedia.identifiedType.toLowerCase(),
          mimeType: selectedMedia.mimeType,
          sizeFormatted: selectedMedia.sizeFormatted,
          previewUrl: selectedMedia.previewUrl || (selectedMedia.dataUrl && selectedMedia.dataUrl.length < 500000 ? selectedMedia.dataUrl : ''),
          timestamp: Date.now(),
          apiResult: apiResult
        };

        try {
          sessionStorage.setItem('truthlens_user_uploaded_media', JSON.stringify(uploadedRecord));
        } catch (e) {
          console.warn('sessionStorage save warning:', e);
        }

        const resultId = selectedMedia.identifiedType === 'VIDEO' ? 'video-demo-02' : selectedMedia.identifiedType === 'AUDIO' ? 'audio-demo-03' : 'image-demo-01';
        router.push(`/results?id=${resultId}&t=${Date.now()}`);
      }
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5" /> MULTIMODAL MEDIA INGESTION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
          Analyze Media
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          Upload an image, video, or audio file, or paste a public media URL to start verification.
        </p>
      </div>

      {/* ERROR BANNER */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs font-mono flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="p-1 text-slate-400 hover:text-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PROCESSING MODAL OVERLAY */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-8 rounded-2xl bg-slate-900 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center mx-auto text-cyan-400 glow-cyan">
                <Sparkles className="w-7 h-7 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 font-mono">
                Processing Forensic Pipeline
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Evaluating {selectedMedia?.identifiedType} signals...
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {processingSteps.map((stepText, idx) => {
                const isCurrent = idx === currentStepIndex;
                const isCompleted = idx < currentStepIndex;

                return (
                  <div 
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-mono transition-all ${
                      isCurrent 
                        ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300 font-bold glow-cyan' 
                        : isCompleted 
                        ? 'bg-slate-950/50 border-slate-800 text-slate-400' 
                        : 'bg-slate-950/20 border-slate-900 text-slate-600'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {isCurrent && <Loader2 className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" />}
                    {!isCompleted && !isCurrent && <div className="w-4 h-4 rounded-full border border-slate-800 shrink-0" />}
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / processingSteps.length) * 100}%` }}
              />
            </div>

          </div>
        </div>
      )}

      {/* UPLOAD CARD CONTAINER */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        
        <div className="flex border-b border-slate-800 bg-slate-950">
          <button
            onClick={() => { setErrorMessage(null); setActiveTab('upload'); }}
            className={`flex-1 py-4 px-6 text-xs sm:text-sm font-semibold font-mono flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'upload'
                ? 'border-cyan-400 text-cyan-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload File
          </button>

          <button
            onClick={() => { setErrorMessage(null); setActiveTab('url'); }}
            className={`flex-1 py-4 px-6 text-xs sm:text-sm font-semibold font-mono flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'url'
                ? 'border-cyan-400 text-cyan-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Paste Public Media URL
          </button>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* TAB 1: UPLOAD AREA */}
          {activeTab === 'upload' && !selectedMedia && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/webp,video/mp4,video/quicktime,video/webm,audio/mp3,audio/mpeg,audio/wav,audio/x-m4a,audio/m4a,.jpg,.jpeg,.png,.webp,.mp4,.mov,.webm,.mp3,.wav,.m4a"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />

              <div
                role="button"
                tabIndex={0}
                onDragEnter={handleDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  dragActive
                    ? 'border-cyan-400 bg-cyan-950/40 glow-cyan'
                    : 'border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950/50'
                }`}
                aria-label="Upload media file. Click or press Enter to browse files."
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4 glow-cyan">
                  <Upload className="w-7 h-7" />
                </div>

                <h3 className="text-base font-bold text-slate-100 font-mono mb-1">
                  Drag & Drop Media File
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  or <span className="text-cyan-400 font-semibold underline">browse local files</span> from your computer
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-[11px] font-mono text-slate-400">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Images: JPG, PNG, WEBP</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Videos: MP4, MOV, WEBM</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    <span>Audio: MP3, WAV, M4A</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PASTE URL */}
          {activeTab === 'url' && !selectedMedia && (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Paste Public Media URL
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://example.com/media/sample.mp4"
                      value={urlInputValue}
                      onChange={(e) => setUrlInputValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all"
                  >
                    Inspect URL
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Direct links starting with http:// or https:// are supported.
              </p>
            </form>
          )}

          {/* SELECTED MEDIA PREVIEW */}
          {selectedMedia && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
                    Uploaded Media Selected
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Detected Type:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    selectedMedia.identifiedType === 'IMAGE'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                      : selectedMedia.identifiedType === 'VIDEO'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-amber-950 text-amber-300 border-amber-700'
                  }`}>
                    {selectedMedia.identifiedType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <div className="md:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-3 flex items-center justify-center min-h-[180px] overflow-hidden">
                  {selectedMedia.identifiedType === 'IMAGE' && (
                    <img
                      src={selectedMedia.previewUrl}
                      alt="Uploaded Preview"
                      className="max-h-44 rounded object-contain"
                    />
                  )}

                  {selectedMedia.identifiedType === 'VIDEO' && (
                    <video
                      src={selectedMedia.previewUrl}
                      controls
                      className="max-h-44 rounded w-full"
                    />
                  )}

                  {selectedMedia.identifiedType === 'AUDIO' && (
                    <div className="w-full p-4 text-center space-y-2">
                      <Music className="w-10 h-10 text-amber-400 mx-auto" />
                      <audio src={selectedMedia.previewUrl} controls className="w-full" />
                    </div>
                  )}
                </div>

                <div className="md:col-span-7 space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">File Name</span>
                    <span className="text-slate-100 font-bold truncate block">{selectedMedia.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase block">File Format</span>
                      <span className="text-cyan-400 font-semibold mt-0.5 block">{selectedMedia.mimeType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase block">File Size</span>
                      <span className="text-slate-200 font-semibold mt-0.5 block">{selectedMedia.sizeFormatted}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={handleRemoveMedia}
                      className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 text-xs font-mono font-semibold flex items-center gap-2 transition-all"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>

                    <button
                      onClick={triggerAnalyze}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 glow-cyan"
                    >
                      <Sparkles className="w-4 h-4" /> Analyze
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
