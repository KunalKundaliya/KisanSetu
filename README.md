# Kisan Setu | Kisan-First AI Conversational Assistant 🌾

> **SIH 2026 Problem Statement:** Agriculture & Rural Development  
> **Core Mission:** Bridging the gap between rural farmers, government schemes, and direct market trade through a voice-first, single-profile conversational platform.

---

## 📌 Executive Overview

**Kisan Setu** is a Hindi-first, voice-enabled conversational assistant designed for low-literacy farmers and first-time smartphone users. It solves two critical pain points in Indian agriculture:

1. **Repetitive Data Entry for Government Schemes:** Instead of filling out separate forms for every welfare program, a farmer enters their profile once via **Farmer ID**, automatically connecting land, crop, and location details across features.
2. **Exploitative Local Crop Selling:** Farmers often sell blindly to middlemen. Kisan Setu compares local **mandi** prices with government **MSP** routes, giving farmers clear trade-offs between price and travel distance.

---

## ⚡ Key Highlights

* 🗣️ **Voice-First UI:** Built around a single large microphone landing state powered by national AI mission infrastructure (**Bhashini**).
* 👤 **Profile-Once Architecture:** Leverages **AgriStack** (Land, Farmer, Crop Sown Registries) so zero re-typing is required.
* 🤖 **Dual-Feature Agent Core:** Driven by a **LangGraph** RAG pipeline handling scheme eligibility and direct crop-selling logic seamlessly.
* 📶 **Offline-Tolerant PWA:** Service workers and IndexedDB store local data so dropped field connections don't disrupt usage.

---

## 🏗️ System Architecture (PADS Overview)
# 🌾 System Architecture

```text
┌─────────────────────────┐
│   Farmer (Voice/Text)   │
└────────────┬────────────┘
             ▼
┌──────────────────────────────────────┐
│ Client Layer — React PWA              │
│ Voice + Text UI                       │
└────────────┬─────────────────────────┘
             ▼
┌──────────────────────────────────────┐
│ API Layer — FastAPI                   │
│ Auth, Routing & Session Management    │
└────────────┬─────────────────────────┘
             ▼
┌──────────────────────────────────────┐
│ Agent Core — LangGraph                │
│ RAG Pipeline & Reasoning Engine       │
└────────────┬─────────────────────────┘
             ▼
┌──────────────────────────────────────┐
│ Data & Integrations                   │
│ PostgreSQL + ChromaDB                 │
│ Bhashini + AgriStack + Mandi APIs     │
└──────────────────────────────────────┘
```

## 🔄 Scheme Eligibility Flow

```text
Farmer Voice Query
        ↓
React PWA
        ↓
FastAPI
        ↓
Bhashini ASR
(Speech → Text)
        ↓
LangGraph Agent
   ├── AgriStack Profile
   └── ChromaDB Schemes
        ↓
Eligibility Decision
        ↓
Bhashini TTS
(Text → Speech)
        ↓
Farmer Hears Response
```

## 📌 Layer Breakdown

* **Client:** React PWA optimized for low-end Android devices.
* **API:** FastAPI handles OTP authentication, routing, sessions, and roles.
* **Agent:** LangGraph manages RAG, reasoning, and eligibility matching.
* **Database:** PostgreSQL stores structured farmer/application data.
* **Vector Store:** ChromaDB stores scheme and agricultural documents.
* **Bhashini:** Provides ASR, translation, and TTS.
* **AgriStack:** Provides farmer/agricultural profile data.
* **Mandi APIs:** Agmarknet/e-NAM provide market price information.
