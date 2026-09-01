# 🌾 Kisan Setu — किसान सेतु

> **AI-powered agricultural assistance for Indian farmers — simple, accessible, and multilingual.**

<div align="center">


![SIH](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-blue?style=for-the-badge)

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react)

![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge\&logo=node.js)

![Python](https://img.shields.io/badge/AI-Python-3776AB?style=for-the-badge\&logo=python)

![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge\&logo=mongodb)

</div>

---

## 🧭 Overview

**Kisan Setu (किसान सेतु)** is a farmer-focused digital agriculture platform developed for **Smart India Hackathon 2026**.

The platform brings agricultural information and essential digital services together in a single, easy-to-use interface.

Its central component, **Kisan Setu AI Saathi**, uses **Retrieval-Augmented Generation (RAG)** to provide agriculture-related answers using a curated knowledge base of agricultural and government documents.

The goal is simple:

> **Make reliable agricultural information easier for farmers to access, understand, and use.**

---

# 🎯 Problem

Farmers often need information from multiple sources for everyday agricultural decisions.

They may need help with:

* 🌾 Crop cultivation
* 🐛 Crop problems and agricultural practices
* 📋 Government schemes
* 🏪 Mandi and market information
* 💰 Crop selling
* 📚 Agricultural guidelines
* 🗣️ Information in a familiar language

Traditional information sources can be difficult to search, understand, or access quickly.

### Our Approach

Kisan Setu provides a **single digital platform** where farmers can ask questions naturally and access agriculture-related services without having to search through multiple sources.

---

# 💡 Solution

Kisan Setu combines a conventional full-stack application with an AI-powered RAG service.

```text
                    👨‍🌾 Farmer / User
                           │
                           ▼
                 ┌───────────────────┐
                 │   React + Vite    │
                 │     Frontend      │
                 └─────────┬─────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
       ┌─────────────────┐   ┌──────────────────┐
       │  Node.js +      │   │ Python + FastAPI │
       │  Express.js     │   │   RAG Service    │
       └────────┬────────┘   └────────┬─────────┘
                │                     │
                ▼                     ▼
       ┌─────────────────┐   ┌──────────────────┐
       │    MongoDB      │   │ Agricultural     │
       │ Application     │   │ Knowledge Base   │
       │     Data        │   └────────┬─────────┘
       └─────────────────┘            │
                                      ▼
                             ┌──────────────────┐
                             │ Retrieval Engine │
                             │   + Gemini LLM   │
                             └──────────────────┘
```

---

# ✨ Key Features

| Feature                    | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| 🤖 **AI Saathi**           | Conversational AI assistant for agriculture-related queries        |
| 📚 **RAG Knowledge Base**  | Retrieves relevant information from curated agricultural documents |
| 🧠 **Context-Aware Chat**  | Supports follow-up questions within a conversation                 |
| 🌾 **Crop Guidance**       | Provides agriculture-related information and guidance              |
| 🏪 **Mandi Directory**     | Search and explore mandi and product information                   |
| 💰 **Crop Sales**          | Maintain farmer-specific crop sales records                        |
| 📋 **Government Schemes**  | Explore agricultural schemes, eligibility and benefits             |
| 🎙️ **Voice Interaction**  | Voice input/output using browser-supported speech capabilities     |
| 🌐 **Multilingual**        | Designed for Hindi, English and Hinglish                           |
| 🔎 **Agricultural Search** | Search agricultural and market-related information                 |
| 📱 **Mobile-Friendly UI**  | Designed with farmer accessibility in mind                         |
| 🔐 **Authentication**      | Secure farmer authentication and protected services                |

---

# 🤖 Kisan Setu AI Saathi

The core intelligence of Kisan Setu is its **Retrieval-Augmented Generation (RAG)** system.

Instead of relying only on the language model's internal knowledge, the system first retrieves relevant information from a curated agricultural knowledge base.

This helps make responses more **grounded in the project's selected source documents**.

## 🔄 RAG Pipeline

```text
             Farmer Question
                    │
                    ▼
          ┌──────────────────┐
          │ Query Processing │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Document         │
          │ Retrieval        │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Relevant Context │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Gemini / LLM     │
          │ Response         │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Farmer-Friendly  │
          │ Answer           │
          └──────────────────┘
```

### AI Service Responsibilities

The Python AI service handles:

* RAG processing
* Agricultural document retrieval
* PDF processing
* Context preparation
* Prompt construction
* LLM integration
* Response generation
* Conversation-related processing

---

# 📚 Agricultural Knowledge Base

The RAG knowledge base contains curated agricultural and government information.

Potential sources include:

* Government scheme documents
* Agricultural guidelines
* Crop information
* Farming practices
* Official agricultural resources

### Knowledge Pipeline

```text
Official / Verified Document
          │
          ▼
    Knowledge Base
          │
          ▼
    PDF Processing
          │
          ▼
    Text Extraction
          │
          ▼
       Chunking
          │
          ▼
      Retrieval
          │
          ▼
    Relevant Context
          │
          ▼
     Gemini LLM
          │
          ▼
     AI Response
```

---

# 🏪 Mandi & Market Module

The Mandi module provides structured market information through the backend.

### Supported functionality

* Create mandi records
* List available mandis
* Search mandis
* Search products
* Search by location
* Search by district
* View mandi information
* Manage product listings
* Identify matching products and prices

The architecture can later be extended to integrate **live mandi-price APIs and external agricultural market data**.

---

# 💰 Crop Sales Management

Farmers can maintain records of their crop sales.

A sales record can contain:

* Farmer
* Product
* Quantity
* Buyer
* Amount
* Date

### Example workflow

```text
Create Sale
    │
    ▼
MongoDB
    │
    ├──► View Farmer Sales
    │
    ├──► Filter by Product
    │
    ├──► Filter by Year
    │
    └──► Filter by Product + Year
```

---

# 📋 Government Schemes

Kisan Setu provides an interface for discovering agricultural government schemes.

Information can include:

* Scheme overview
* Eligibility
* Benefits
* Required documents
* Application information
* Important conditions

The knowledge base can be expanded using **verified government documents and official sources**.

---

# 🎙️ Voice Assistance

Voice interaction is designed to reduce dependence on typing.

```text
Farmer Speaks
      │
      ▼
Speech Recognition
      │
      ▼
Text Query
      │
      ▼
AI / RAG Assistant
      │
      ▼
AI Response
      │
      ▼
Text-to-Speech
      │
      ▼
Farmer Hears Response
```

Voice functionality can use browser-supported:

* Speech Recognition
* Speech Synthesis

Availability may vary depending on the browser and device.

---

# 🌐 Multilingual Accessibility

The platform is designed around three primary interaction styles:

* 🇮🇳 Hindi
* 🇬🇧 English
* 🗣️ Hinglish

The long-term objective is to expand support for additional Indian languages.

---

# 🏗️ System Architecture

## Frontend

**React + Vite**

Responsible for:

* Farmer interface
* Dashboard
* AI chatbot
* Voice interaction
* Crop marketplace
* Government schemes
* Profile
* Search
* Responsive/mobile experience

## Backend

**Node.js + Express.js**

Responsible for:

* REST APIs
* Authentication
* Controllers
* Business logic
* Database communication
* Request validation
* Middleware

## AI Microservice

**Python + FastAPI**

Responsible for:

* RAG pipeline
* Document processing
* Retrieval
* LLM integration
* AI response generation

## Database

**MongoDB + Mongoose**

Responsible for:

* Farmer records
* Crop information
* Mandi information
* Sales records
* Application data

---

# 🛠️ Technology Stack

| Layer               | Technology          |
| ------------------- | ------------------- |
| Frontend            | React, Vite         |
| Backend             | Node.js, Express.js |
| Database            | MongoDB, Mongoose   |
| AI Service          | Python, FastAPI     |
| RAG                 | LangChain           |
| LLM                 | Google Gemini       |
| Document Processing | PyPDF               |
| Authentication      | JWT / OTP           |
| Voice               | Web Speech API      |
| Version Control     | Git, GitHub         |

---

# 📁 Repository Structure

```text
Kisan-Setu/
│
├── backend/
│   └── src/
│       ├── chatbot/
│       │   ├── main.py
│       │   ├── config.py
│       │   ├── llm_service.py
│       │   ├── rag_service.py
│       │   └── data/
│       │       └── documents/
│       │
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       ├── utils/
│       └── index.js
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Login/
│       │   ├── Home/
│       │   ├── Chat/
│       │   ├── SellCrop/
│       │   ├── Schemes/
│       │   ├── Profile/
│       │   └── Admin/
│       │
│       ├── components/
│       └── services/
│           └── api.js
│
├── docs/
├── tests/
│
├── .env.example
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Install:

* **Node.js 18+**
* **npm**
* **Python 3.10+**
* **MongoDB / MongoDB Atlas**
* **Git**
* **Google Gemini API key**

---

## 1. Clone Repository

```bash
git clone <repository-url>
cd Kisan-Setu
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OTP_SECRET=your_otp_secret

GEMINI_API_KEY=your_google_gemini_api_key

CORS_ORIGIN=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 4. RAG / AI Setup

Navigate to the AI service:

```bash
cd backend/src/chatbot
```

Install required dependencies:

```bash
pip install langchain-google-genai pypdf
```

Additional Python dependencies should be installed according to the project's configured requirements.

The FastAPI entry point is:

```text
backend/src/chatbot/main.py
```

---

# 🔌 API Overview

## Authentication

| Method | Endpoint                     | Description        |
| ------ | ---------------------------- | ------------------ |
| POST   | `/api/v1/farmers/send-otp`   | Send OTP           |
| POST   | `/api/v1/farmers/verify-otp` | Verify OTP         |
| GET    | `/api/v1/farmers/profile`    | Get farmer profile |

## AI & Voice

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | `/api/v1/voice/text-query` | Send text query      |
| POST   | `/api/v1/voice/query`      | Process voice query  |
| GET    | `/api/v1/health`           | Check service health |

## Government Schemes

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| GET    | `/api/v1/schemes`             | Get available schemes |
| POST   | `/api/v1/schemes/:code/apply` | Apply for a scheme    |

## Crops

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/api/v1/crops` | Get crop listings   |
| POST   | `/api/v1/crops` | Create crop listing |

## Admin

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/v1/admin/farmers` | Manage farmer records |

---

# 🔐 Security

Never commit sensitive credentials to GitHub.

Keep the following private:

```text
.env
API keys
Database credentials
JWT secrets
OTP secrets
Passwords
```

Use:

```text
.env.example
```

to document the required environment variables without exposing real credentials.

---

# 🧪 Testing

Testing should cover:

* API functionality
* Authentication
* RAG retrieval
* AI response generation
* Database operations
* Voice-related functionality
* Frontend/backend integration

For Python components:

```bash
pytest
```

---

# 📈 Future Scope

## 🌦️ Smart Agriculture

* Weather integration
* Location-aware recommendations
* Crop calendars
* Pest and disease identification
* Crop-health analysis
* Soil information

## 🏪 Market Intelligence

* Live mandi prices
* Price comparison
* Historical price trends
* Market recommendations
* Demand forecasting

## 🤖 Advanced AI

* Image-based crop disease detection
* Multimodal agricultural analysis
* Personalized recommendations
* Improved agricultural RAG
* Source verification
* Feedback-based improvement

## 🗣️ Accessibility

* More Indian languages
* Voice-first interaction
* Improved speech-to-text
* Improved text-to-speech
* Low-bandwidth experience
* Simplified farmer-oriented interface

## ☁️ Platform

* Role-based access control
* Advanced admin dashboard
* API rate limiting
* Monitoring
* Cloud deployment
* CI/CD automation

---

<div align="center">

### 🌾 Kisan Setu — Connecting Farmers with Technology

**Built for Smart India Hackathon 2026 🇮🇳**

</div>
