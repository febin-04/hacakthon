# TruthLens AI — Multimodal Media Forensics & Verification Platform

> **"Detect. Understand. Verify."**

TruthLens AI is an open, multi-signal digital media forensics and source verification engine designed to address the rise of synthetic AI deepfakes and miscontextualized digital media.

---

## 1. Problem Statement

Generative AI tools (e.g. Midjourney, DALL-E 3, Flux, Sora, Runway, ElevenLabs) enable rapid creation of ultra-realistic synthetic images, deepfake videos, and voice clones. Traditional binary AI detectors often suffer from high false-positive rates—misclassifying authentic real-world photographs because of lossy JPEG compression, social media platform transit (e.g. WhatsApp stripping camera EXIF), or unusual lighting.

Furthermore, authentic photographs are frequently recycled with misleading contextual claims ("cheapfakes"). A reliable verification platform must distinguish between **Media Authenticity** and **Contextual Credibility** while providing transparent, evidence-based reasoning rather than black-box guesses.

---

## 2. Solution Overview

TruthLens AI solves false positives by implementing an **8-Signal Evidence Fusion Engine**. The platform never relies on a single isolated anomaly. Instead, it synthesizes objective visual analysis, specialized neural deepfake detectors, hardware camera EXIF headers, filename pattern forensics, watermark OCR inspection, Error Level Analysis (ELA), and archival source matching.

---

## 3. Key Features

- 🔍 **Multimodal Media Support**: Image (JPG, PNG, WEBP), Video (MP4, MOV, WEBM), and Audio (MP3, WAV, M4A).
- 🧬 **Multi-Signal Evidence Fusion**: Aggregates 8 independent forensic channels into a single unified taxonomy assessment.
- 📷 **EXIF & Camera Hardware Inspection**: Identifies authentic camera sensor maker tags (Apple iPhone, Canon, Sony, Google Pixel) and distinguishes them from generative software tags.
- 🏷️ **Watermark & OCR Analysis**: Scans for embedded generative AI software signatures (`DALL-E`, `Midjourney`, `Firefly`, `ComfyUI`) while distinguishing photographer copyright watermarks.
- 📁 **Filename Forensics**: Analyzes camera naming patterns (`IMG_`, `DSC_`, `PXL_`), messaging transit signatures (`WA...`), and generative AI model clues.
- 🌐 **Source & Context Verification**: Reverses media against archival wire databases to catch authentic media reused with misleading claims.
- 🤖 **Evidence-Grounded AI Assistant**: Interactive assistant answering user questions strictly grounded in extracted forensic evidence.
- 📊 **Automated Benchmark Evaluation**: Real-time evaluation page `/evaluation` calculating Accuracy, Precision, Recall, F1 Score, and Confusion Matrix across test datasets.

---

## 4. System Architecture

```text
User / OSINT Researcher
       │
       ▼
Next.js 14 Frontend Interface (WCAG 2.1 AA Compliant)
       │
       ▼ (Server-Side Isolated API Routes: /api/analyze)
       ├─────────────────────────────────────────┐
       ▼                                         ▼
Gemini Multimodal Vision API         Reality Defender Enterprise AI Detector
(Objective Visual Evidence Engine)   (Specialized Neural Deepfake Models)
       │                                         │
       ├─────────────────┬───────────────────────┘
       ▼                 ▼
  EXIF / Metadata    Filename & Watermark    Error Level Analysis (ELA)
  Parser Engine      OCR Classifier          Frequency Residual Engine
       │                 │                       │
       └─────────────────┴───────────┬───────────┘
                                     ▼
                      Multi-Signal Evidence Fusion Engine
                                     │
                                     ▼
                         Final Verification Report
         (LIKELY AUTHENTIC | NEEDS VERIFICATION | LIKELY AI-GENERATED)
```

---

## 5. AI Technologies Used

1. **Google Gemini Flash Multimodal Vision API (`@google/genai`)**:
   - Model Candidates: `gemini-flash-latest`, `gemini-3.7-flash`, `gemini-3.6-flash`, `gemini-flash-lite-latest`.
   - Role: Objective visual evidence extractor (identifies physical optics, depth-of-field, lighting vectors, and anatomical anomalies without making binary claims).
2. **Reality Defender Enterprise AI Detection Engine (`@realitydefender/realitydefender`)**:
   - Role: Deep neural ensemble detector calculating synthetic probability scores.
3. **TruthLens Multi-Signal Evidence Fusion Engine**:
   - Role: Synthesizes API outputs, local EXIF tags, filename patterns, and watermark markers into a final deterministic taxonomy classification.

---

## 6. Detection & Evidence Fusion Methodology

TruthLens AI enforces strict evidence rules to prevent false positive AI classifications:

### Evidence Taxonomy:
- `LIKELY AUTHENTIC`: High authentic signal score ($\ge 2$ points), supported by camera EXIF or clean visual evidence.
- `NEEDS VERIFICATION`: Weak or single-signal anomaly. Safe fallback default.
- `LIKELY AI-GENERATED`: Requires multiple independent strong signals ($\ge 4$ points, e.g. specialized detector flag + visual AI artifacts + generative software tag).
- `LIKELY MANIPULATED`: Splicing or localized edit artifacts.
- `INSUFFICIENT EVIDENCE`: Detection APIs offline and media payload lacks camera metadata.

### Non-Proof Rules:
The following are **NEVER** treated as proof of AI generation:
- Missing EXIF metadata
- JPEG compression
- Image resizing or low resolution
- OS screenshots
- WhatsApp or social media transit compression
- Unusual lighting or facial features
- Generic filename

---

## 7. Automated Testing & Evaluation

For detailed testing documentation, test dataset metrics, and error boundaries, view [TESTING.md](./TESTING.md).

### Run Test Suite:
```bash
# Run 34 automated unit and integration tests (Vitest)
npm test

# View dynamic evaluation page in browser
http://localhost:3000/evaluation
```

### Benchmark Metrics Summary:
- **Test Samples**: 15 (5 Authentic, 5 Synthetic AI, 5 Manipulated/Edited)
- **Accuracy**: `93.3%`
- **Precision**: `100.0%`
- **Recall**: `90.0%`
- **F1 Score**: `94.7%`
- **False Positives**: `0`

---

## 8. Accessibility Compliance

TruthLens AI satisfies **WCAG 2.1 Level AA** standards:
- **Semantic HTML5**: Full use of `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`.
- **Keyboard Navigation**: Complete TAB focus order with high-contrast focus rings (`focus-visible:ring-cyan-400`).
- **Accessible Controls**: File upload dropzone with keyboard support (`role="button"`, `tabIndex={0}`, `Enter`/`Space` activation).
- **Non-Color Indicators**: Visual status tags include clear symbol prefixes (`✓ LIKELY AUTHENTIC`, `⚠ NEEDS VERIFICATION`, `! LIKELY AI-GENERATED`).
- **Screen Reader Support**: ARIA live regions (`aria-live="polite"`) for progress states and error banners.

---

## 9. Security & Data Protection

- **API Key Protection**: External API credentials (`GEMINI_API_KEY`, `REALITY_DEFENDER_API_KEY`) are stored **strictly in server-side environment variables** and are NEVER exposed to client browsers or `NEXT_PUBLIC_` variables.
- **Validation**: Server-side MIME validation and file extension checking.
- **Payload Limits**: Strict 50MB file size limit.
- **Resiliency**: 3000ms upload timeouts on external providers with automatic fallback handling.
- **Sanitization**: API error responses exclude internal stack traces and secret keys.

---

## 10. Limitations

AI media detection is probabilistic. TruthLens AI evaluates observable physical, optical, and neural frequency artifacts to provide evidence and risk indicators rather than absolute guarantee of authenticity.

---

## 11. Setup & Installation Guide

### Prerequisites:
- Node.js v18.0.0 or higher
- npm or yarn

### Installation:
```bash
# Clone repository
git clone https://github.com/febin-04/hacakthon.git
cd hacakthon/truthlens

# Install dependencies
npm install --legacy-peer-deps

# Configure environment variables
cp .env.example .env.local
```

### API Configuration (`.env.local`):
```ini
# Server-Side External API Keys (Required for live API analysis)
GEMINI_API_KEY=your_gemini_api_key_here
REALITY_DEFENDER_API_KEY=your_reality_defender_api_key_here
```

### Run Locally:
```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production:
```bash
npm run build
npm run start
```
