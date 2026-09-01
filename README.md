
# 🌾 Kisan Setu — किसान सेतु

> Bridging the gap between Indian farmers and government services through AI-powered voice assistance.

<div align="center">

![Made for Farmers](https://img.shields.io/badge/Made%20for-Indian%20Farmers-green?style=for-the-badge&logo=leaf)
![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-24.x-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [How the RAG Chatbot Works](#how-the-rag-chatbot-works)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Schemes Covered](#schemes-covered-by-the-ai-knowledge-base)
- [Tech Stack](#tech-stack)
- [Roadmap](#roadmap)

---

## Overview

**Kisan Setu** *(Farmer's Bridge)* is a full-stack, mobile-first Progressive Web Application built for Smart India Hackathon 2026. It gives Indian farmers a conversational, RAG-powered AI assistant that understands their language — delivering personalized agricultural advice, government scheme eligibility, and mandi price updates in one place.

> *"Koi bhi kisan akela nahi rahega."* — No farmer is left alone.

---

## Key Features

| Feature | Description |
|---|---|
| 🤖 RAG AI Chatbot | Answers farmer queries using official scheme documents (PM-KMY, PM-KISAN, PMFBY, KCC) via Google Gemini 2.0 Flash + LangChain |
| 🎙️ Voice Interface | Farmers speak in Hindi; the Web Speech API handles speech-to-text input and reads responses back aloud |
| 📋 AgriStack Integration | Auto-links a farmer's Kisan ID from the National AgriStack registry on OTP login |
| 🌾 Fasal Becho (Sell Crop) | Farmers list produce directly; buyers can browse and purchase |
| 📊 Scheme Explorer | Browse PM-KISAN, PMFBY, KCC, and PM-KMY with one-tap eligibility checks |
| 🖥️ Admin Portal | Manage farmer records, register Kisan IDs, and review scheme applications |
| 📱 Mobile-First UI | Built as a smartphone-first experience with Material-style components |
| 🔒 OTP Authentication | Passwordless login via mobile number |

---

## Project Structure

```
Kisan-Setu/
├── .gitignore
├── .vscode/
│   └── settings.json
├── vercel.json
├── README.md
│
├── backend/
│   ├── package.json
│   ├── postman-collection.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── constants.js
│       ├── chatbot/                # Python RAG microservice
│       │   ├── main.py             # FastAPI entry point
│       │   ├── config.py           # Environment configuration
│       │   ├── llm_service.py      # LangChain + Gemini integration
│       │   ├── rag_service.py      # Document retrieval engine
│       │   └── data/
│       │       ├── document_cache.json
│       │       └── documents/      # Official scheme PDFs
│       ├── controllers/
│       │   ├── admin.controller.js
│       │   ├── crop.controller.js
│       │   ├── csc.controller.js
│       │   ├── farmer.controller.js
│       │   ├── scheme.controller.js
│       │   └── video.controller.js
│       ├── db/
│       │   └── index.db.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── error.middleware.js
│       ├── models/
│       │   ├── cropListing.model.js
│       │   ├── farmer.model.js
│       │   ├── mandiPriceCache.model.js
│       │   ├── scheme.model.js
│       │   ├── schemeApplication.model.js
│       │   └── video.model.js
│       ├── routes/
│       │   ├── admin.routes.js
│       │   ├── crop.routes.js
│       │   ├── csc.routes.js
│       │   ├── farmer.routes.js
│       │   ├── scheme.routes.js
│       │   ├── video.routes.js
│       │   └── voice.routes.js
│       ├── scripts/
│       │   └── seedSchemes.js
│       ├── services/
│       │   └── aiChat.service.js
│       └── utils/
│           ├── agristack.js
│           ├── agmarknet.js
│           ├── bhashini.js
│           ├── cloudinary.js
│           ├── geo.js
│           ├── jwt.js
│           ├── logger.js
│           ├── otp.js
│           └── sms.js
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── vercel.json
    ├── README.md
    ├── public/
    │   └── assets/
    └── src/
        ├── App.jsx
        ├── App.css
        ├── main.jsx
        ├── index.css
        ├── assets/
        ├── components/
        │   ├── BottomNav/
        │   ├── Button/
        │   ├── Input/
        │   └── TopAppBar/
        ├── context/
        │   └── AuthContext.jsx
        ├── layouts/
        │   ├── MainLayout.jsx
        │   └── MainLayout.module.css
        ├── pages/
        │   ├── Admin/
        │   ├── Chat/
        │   ├── Home/
        │   ├── Login/
        │   ├── Marketplace/
        │   ├── Onboarding/
        │   ├── Profile/
        │   ├── Schemes/
        │   └── Splash/
        └── services/
            └── api.js
```

---

## How the RAG Chatbot Works

```
User Query (Hindi / English)
        │
        ▼
Voice Recognition — Web Speech API (browser-native STT)
        │
        ▼
Node.js Express API — POST /api/v1/voice/text-query
        │  (execFile)
        ▼
Python RAG Engine — backend/src/chatbot/
   1. rag_service.py  → Document retrieval from scheme PDFs
   2. llm_service.py  → Response generation via LangChain + Gemini 2.0 Flash
        │
        ▼
Structured JSON → AI Response Card (React /chat page)
        │
        ▼
Text-to-Speech — Web Speech Synthesis API
```

---

## Quick Start

### Prerequisites
- Node.js v18+ and npm
- Python v3.10+
- MongoDB Atlas (free tier is sufficient)
- Google Gemini API key (optional — enables live AI responses)

### 1. Clone the Repository
```bash
git clone https://github.com/infinity-0008/SIH-Project.git
cd SIH-Project
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` :
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/kisan_setu
JWT_SECRET=your_jwt_secret_here
OTP_SECRET=your_otp_secret_here
GEMINI_API_KEY=your_google_gemini_api_key
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
CORS_ORIGIN=http://localhost:5173
```

Install Python dependencies for the RAG service:
```bash
pip install langchain-google-genai pypdf
```

Start the backend:
```bash
npm run dev
```
Runs at `http://localhost:5000` or any of local server hosting in respective server.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173` or any of local server hosting in respective server.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/farmers/send-otp` | Send OTP to farmer's mobile number |
| POST | `/api/v1/farmers/verify-otp` | Verify OTP and receive JWT |
| GET | `/api/v1/farmers/profile` | Fetch logged-in farmer's profile |
| POST | `/api/v1/voice/text-query` | RAG AI text chat query |
| POST | `/api/v1/voice/query` | Voice query (audio → AI response) |
| GET | `/api/v1/schemes` | List all government schemes |
| POST | `/api/v1/schemes/:code/apply` | Apply for a government scheme |
| GET | `/api/v1/crops` | Browse all listed crops |
| POST | `/api/v1/crops` | List a new crop for sale |
| POST | `/api/v1/admin/farmers` | Admin: register a Kisan ID |
| GET | `/api/v1/health` | Service health check |

Full request/response examples are available in [`postman-collection.json`](./backend/postman-collection.json).

---

## Schemes Covered by the AI Knowledge Base

| Code | Scheme | Benefit |
|---|---|---|
| PM-KMY | PM Kisan Maandhan Yojana | ₹3,000/month pension from age 60 |
| PM-KISAN | PM Kisan Samman Nidhi | ₹6,000/year across 3 direct bank instalments |
| PMFBY | PM Fasal Bima Yojana | Crop loss insurance — 2% premium (Kharif), 1.5% (Rabi) |
| KCC | Kisan Credit Card | ₹3 lakh credit facility at 4% effective interest |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, CSS Modules, Lucide Icons |
| Backend API | Node.js 24, Express.js 5, MongoDB Atlas, Mongoose |
| AI / RAG Engine | Python 3, LangChain, Google Gemini 2.0 Flash |
| Document Parsing | PyPDF for chunking and retrieval from official scheme PDFs |
| Authentication | JWT, OTP-based mobile login |
| Media Storage | Cloudinary (images), MongoDB (structured data) |
| Voice | Web Speech API (native browser STT/TTS, no external API cost) |
| AgriStack | Custom farmer registry with Kisan ID auto-link on login |

---

## Roadmap

- [ ] Multilingual support beyond Hindi and English (regional languages)
- [ ] Offline-first support for low-connectivity rural areas
- [ ] SMS-based fallback for feature phones
- [ ] Integration with e-NAM for real-time mandi price sync

---
