# Plantation Management System

AI-assisted farm management with FastAPI, static React frontend, and Gemini-powered disease detection/chatbot. Includes weather, market prices, and offline-friendly fallbacks.  

## Screenshots

### 🏠 Home Dashboard
Overview of farm statistics, crops, weather insights, and quick actions.

![Home dashboard](pic%20of%20project/frontpage.png)

---

### 🤖 AI Agriculture Chatbot
Gemini-powered chatbot that answers farming questions and provides guidance (with mock fallback).

![AI chatbot](pic%20of%20project/chatbot.png)

---

### 🌿 Gemini Plant Disease Scanner
Upload plant images to detect diseases using Gemini AI (with offline-safe mock mode).

![Gemini plant scanner](pic%20of%20project/geminiapiplantscanner.png)

---

### 📈 Market Price Insights
Live (or mocked) agricultural market prices integrated using Alpha Vantage.

![Market insights](pic%20of%20project/marketapivalue.png)

---

### 🌍 Sinhala Language Interface
Localized Sinhala UI for better accessibility for local farmers.

![Sinhala view](pic%20of%20project/sinhalafront.png)

---

## Features
- JWT auth with roles (farmer/admin)
- Farm/crop management with soil readings
- Gemini AI disease detection and agri chatbot (fallback mocks when no key)
- Weather (OpenWeather) and market prices (Alpha Vantage) with graceful mock data
- PWA-ready static frontend (Leaflet maps, charts, offline cache)
- Firebase Function endpoints for Gemini as an alternative deployment path

## Architecture
- Backend: FastAPI + SQLite (dev) with image uploads and JWT auth
- Frontend: static files served via simple HTTP server or any static host
- Serverless: functions/main.py for Firebase/Cloud Functions
- Docker: backend and frontend services via docker-compose.yml

## Prerequisites
- Python 3.12+ (recommended)
- Node/npm only if you plan to add a JS build step (current frontend is static)
- Docker Desktop (optional)

## Setup (local)
1) Clone/fork the repo.
2) Create backend/.env with your secrets (do not commit this file):
```
SECRET_KEY=change-me
GEMINI_API_KEY=your-gemini-api-key
OPENWEATHER_API_KEY=your-openweather-api-key
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-api-key
```
3) Install backend deps:
```
cd backend
python -m pip install -r requirements.txt
```
4) Run the backend:
```
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
5) Run the frontend (static):
```
cd ../frontend
python -m http.server 3001 --bind 127.0.0.1
```
6) Open:
- Frontend: http://127.0.0.1:3001
- API/docs: http://127.0.0.1:8000/docs

Shortcuts: start_app.bat starts both servers on Windows.

## Docker
1) Create a .env at the project root with the same keys as above.
2) Start:
```
docker-compose up --build
```
3) Open http://127.0.0.1:3000 (frontend) and http://127.0.0.1:8000 (API).

## Firebase/Cloud Functions
- Deploy functions/main.py as an HTTP function and set GEMINI_API_KEY in the function environment.
- For local testing: GEMINI_API_KEY=... functions-framework --target disease_detection --port 8080.

## Notes on secrets
- No API keys are committed; defaults were removed.
- Keep .env files private; .gitignore prevents them from being added.
- Backend falls back to mock data for weather/market and to canned responses for the chatbot when keys are missing.

## Useful scripts
- start_app.bat: start backend + static frontend (Windows)
- start_backend.bat: backend only
- start_docker.bat: docker-compose convenience wrapper

## Project structure (trimmed)
```
plantation/
├─ backend/          # FastAPI app, DB, uploads
├─ frontend/         # Static assets and PWA files
├─ functions/        # Firebase/Cloud Functions entry
├─ pic of project/   # Screenshots used in this README
├─ docker-compose.yml
└─ README.md
```

## Contributing
Feel free to open issues or PRs. Please keep secrets out of version control and use environment variables for configuration.
