<div align="center">

# 🏥 AI Medical Assistant Platform

### Production-Ready AI-Powered Clinic Management Platform

An intelligent healthcare platform that combines **Artificial Intelligence**, **WhatsApp Business Cloud API**, and a modern **Web Dashboard** to automate patient communication, appointment booking, and clinic management.

---

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)
![Gemini](https://img.shields.io/badge/Google-Gemini-blue)
![WhatsApp](https://img.shields.io/badge/Meta-WhatsApp%20Cloud%20API-25D366?logo=whatsapp)

</div>

---

# 📖 Overview

AI Medical Assistant is a production-oriented SaaS platform designed to help clinics automate patient communication using artificial intelligence.

Instead of relying on a human receptionist for every interaction, patients communicate directly with an AI-powered WhatsApp assistant capable of answering medical questions, providing clinic information, managing appointments, and maintaining conversation history.

The platform includes a modern web dashboard that enables clinic administrators to manage doctors, patients, appointments, conversations, analytics, AI knowledge, and system settings from a single interface.

---

# ✨ Key Features

## 🤖 Artificial Intelligence

- AI Medical Assistant powered by Google Gemini
- Medical Question Answering
- Retrieval-Augmented Generation (RAG)
- PDF Knowledge Base
- Intelligent Intent Detection
- Conversation Memory
- Patient Profile Extraction
- Context-Aware Responses
- Structured Prompt Engineering
- AI Response Validation

---

## 💬 WhatsApp Integration

- Official Meta WhatsApp Business Cloud API
- Interactive Buttons
- Smart Menus
- Appointment Booking
- Appointment Cancellation
- Conversation Tracking
- Duplicate Message Protection
- Automated AI Responses

---

## 🏥 Clinic Management

- Doctor Management
- Patient Management
- Appointment Scheduling
- Appointment History
- Conversation Management
- Knowledge Base Management
- Clinic Settings
- AI Configuration

---

## 📊 Dashboard

- Real-Time Dashboard
- Patients Module
- Doctors Module
- Conversations Module
- Appointments Module
- Analytics
- Medical Knowledge Management
- Clinic Configuration

---

## 🧠 Knowledge Base

- Upload Medical PDF Files
- Delete Knowledge Files
- Rebuild AI Embeddings
- Medical Document Search
- Dynamic Knowledge Updates

---

## 📈 Analytics

- Patient Statistics
- Appointment Statistics
- Conversation Statistics
- Dashboard Metrics

---

# 🚀 Main Capabilities

✔ AI Receptionist

✔ WhatsApp Chatbot

✔ Appointment Booking

✔ AI Medical Question Answering

✔ Patient Profiles

✔ Doctor Management

✔ Medical Knowledge Base

✔ Conversation History

✔ Dashboard Analytics

✔ Modern Admin Dashboard

✔ Modular Backend Architecture

✔ Production-Ready Design

---

# 🖥 Dashboard Modules

- Dashboard
- Doctors
- Patients
- Appointments
- Conversations
- Analytics
- Medical Knowledge
- Settings

---

# 📱 WhatsApp Workflow

```text
Patient

↓

WhatsApp Business Cloud API

↓

FastAPI Backend

↓

Conversation Processor

↓

Intent Detection

↓

Business Logic

↓

AI Engine (Gemini + RAG)

↓

Supabase Database

↓

AI Response

↓

Patient
```

---

# 🎯 Project Goals

- Automate clinic communication.
- Reduce receptionist workload.
- Improve appointment management.
- Deliver intelligent AI-powered healthcare assistance.
- Build a scalable healthcare SaaS platform.
- Provide a production-ready architecture suitable for real clinics.

---

# 📸 Screenshots

> Screenshots will be added here.

### Dashboard

![Dashboard](screenshots/01-dashboard.png)

### Patients

![Patients](screenshots/02-patients.png)

### Conversations

![Conversations](screenshots/03-conversations.png)

### Appointments

![Appointments](screenshots/04-appointments.png)

### Medical Knowledge

![Knowledge](screenshots/05-knowledge.png)

### Settings

![Settings](screenshots/06-settings.png)

---
# 🏗 System Architecture

The platform follows a modular and scalable architecture designed for production environments. Each module has a single responsibility, making the system easy to maintain, extend, and test.

```text
                            Patient
                               │
                               │
                WhatsApp Business Cloud API
                               │
                               ▼
                      FastAPI Backend
                               │
                               ▼
                  Conversation Processor
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
          ▼                                         ▼
   Intent Detection                         Button Handler
          │                                         │
          └────────────────────┬────────────────────┘
                               ▼
                        Business Logic
                               │
      ┌───────────────┬───────────────┬───────────────┐
      ▼               ▼               ▼               ▼
 Patient DB      Appointment      Clinic Data     AI Engine
                    Engine                            │
                                                      ▼
                                           RAG Knowledge Base
                                                      │
                                                      ▼
                                                Google Gemini
                                                      │
                                                      ▼
                                              AI Response
                                                      │
                                                      ▼
                                              WhatsApp User
```

---

# 🧩 Backend Architecture

The backend is built using a modular architecture where each feature is isolated into its own module.

Each module contains:

- Router
- Service
- Repository
- Models (when needed)
- Utilities

This approach makes the project scalable and easy to maintain.

---

# 📂 Project Structure

```text
AI-Medical-Assistant/

backend/
│
├── app/
│
│   ├── api/
│   │     └── v1/
│   │
│   ├── modules/
│   │
│   │     ├── ai/
│   │     ├── analytics/
│   │     ├── appointments/
│   │     ├── clinic/
│   │     ├── conversations/
│   │     ├── dashboard/
│   │     ├── database/
│   │     ├── doctors/
│   │     ├── intent/
│   │     ├── knowledge/
│   │     ├── message_tracker/
│   │     ├── patient_details/
│   │     ├── profile/
│   │     ├── rag/
│   │     ├── settings/
│   │     ├── whatsapp/
│   │
│   ├── knowledge/
│   ├── chroma_db/
│   └── main.py
│
dashboard/
│
├── src/
│
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   └── types/
│
└── package.json
```

---

# ⚙ Backend Technologies

| Technology | Purpose |
|------------|---------|
| Python 3.13 | Backend Language |
| FastAPI | REST API |
| Uvicorn | ASGI Server |
| Supabase | Database |
| PostgreSQL | Relational Database |
| Pydantic | Data Validation |
| HTTPX | External API Requests |

---

# 🤖 Artificial Intelligence Stack

| Technology | Purpose |
|------------|---------|
| Google Gemini | Large Language Model |
| Sentence Transformers | Embeddings |
| ChromaDB | Vector Database |
| RAG | Medical Knowledge Retrieval |
| Prompt Engineering | AI Context Building |

---

# 🎨 Frontend Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| TailwindCSS | Styling |
| TanStack Query | Server State |
| React Router | Routing |
| Axios | API Requests |
| Recharts | Analytics Charts |
| React Hook Form | Forms |
| Zod | Validation |

---

# ☁ Cloud Services

- Supabase
- Meta WhatsApp Business Cloud API
- Google Gemini API

---

# 📦 Database

Main tables used by the platform:

- user_profiles
- conversations
- appointments
- doctors
- specialties
- clinic_information
- services
- medical_documents
- processed_messages

---

# 🔐 Authentication

- WhatsApp Phone Number Authentication
- Clinic Administrator Authentication
- Protected Dashboard Routes

---

# 🧠 AI Workflow

```text
Patient Message

↓

WhatsApp Webhook

↓

Message Parser

↓

Conversation Processor

↓

Intent Detection

↓

Business Logic

↓

Need AI?

 ├── No → Execute Business Logic
 │
 └── Yes
      │
      ▼

Medical Context Builder

↓

RAG Search

↓

Prompt Builder

↓

Gemini

↓

Response Validator

↓

WhatsApp Reply
```

---

# 📈 Scalability

The system was designed with scalability in mind.

Supported architecture principles include:

- Modular Design
- Repository Pattern
- Service Layer
- REST API
- Separation of Concerns
- Feature-based Frontend
- AI Isolation
- Independent Business Modules

Future modules can be added without affecting existing functionality.

Examples:

- Laboratory
- Radiology
- Pharmacy
- Insurance
- Payments
- Notifications
- Multi-Clinic Support
- Multi-Tenant SaaS

---

# 🔄 Data Flow

```text
User

↓

WhatsApp

↓

Webhook

↓

FastAPI

↓

Conversation Processor

↓

Intent Detection

↓

Business Logic

↓

Database

↓

AI (if needed)

↓

Response

↓

WhatsApp
```
# 🗄 Database Design

The platform uses **Supabase PostgreSQL** as the primary relational database.

Each table is responsible for a single business domain, making the database scalable and easy to maintain.

---

## Main Tables

### 👤 user_profiles

Stores patient information.

| Column | Description |
|---------|-------------|
| phone_number | Primary Identifier |
| name | Patient Name |
| age | Age |
| gender | Gender |
| blood_type | Blood Type |
| allergies | Allergies |
| chronic_diseases | Chronic Diseases |
| medications | Current Medications |
| height | Height |
| weight | Weight |
| created_at | Creation Date |

---

### 💬 conversations

Stores every WhatsApp conversation.

| Column | Description |
|---------|-------------|
| id | Conversation ID |
| phone_number | Patient Phone |
| role | user / assistant |
| message | Message Content |
| created_at | Timestamp |

---

### 📅 appointments

Stores appointment bookings.

| Column | Description |
|---------|-------------|
| id | Appointment ID |
| patient_phone | Patient |
| doctor_id | Doctor |
| appointment_date | Date |
| appointment_time | Time |
| status | Pending / Confirmed / Cancelled |

---

### 👨‍⚕️ doctors

Stores doctors.

| Column | Description |
|---------|-------------|
| id | Doctor ID |
| full_name | Doctor Name |
| specialty_id | Specialty |
| branch_id | Clinic Branch |
| available | Availability |

---

### 🏥 specialties

Medical specialties.

Example:

- Cardiology
- Pediatrics
- Dermatology
- Orthopedics
- Neurology

---

### 🏢 clinic_information

Stores clinic information.

Example:

- Clinic Name
- Address
- Working Hours
- Emergency Number
- Insurance Companies

---

### 🩺 services

Clinic services.

Examples:

- Consultation
- X-Ray
- Laboratory
- Ultrasound

---

### 📚 Medical Knowledge

Medical PDFs are stored locally while embeddings are generated into ChromaDB for semantic search.

Examples:

- GINA Guidelines
- GOLD COPD
- WHO Diabetes
- Clinical Protocols

---

### 📨 processed_messages

Stores processed WhatsApp message IDs to prevent duplicate webhook events.

---

# 🔗 Database Relationships

```text
user_profiles
      │
      │ phone_number
      ▼
appointments
      ▲
      │ doctor_id
      │
doctors
      │
      ▼
specialties
```

---

# 🤖 AI Pipeline

Unlike traditional chatbots, the platform uses multiple processing stages before generating an AI response.

```text
Incoming WhatsApp Message

↓

Webhook

↓

Message Parser

↓

Conversation Processor

↓

Conversation State

↓

Intent Detection

↓

Business Logic

↓

Need AI?

        │
   ┌────┴────┐
   │         │
   │ No      │ Yes
   │         │
   ▼         ▼

Database   Medical Context Builder

              ↓

         RAG Retrieval

              ↓

       Prompt Builder

              ↓

       Google Gemini

              ↓

     Response Validator

              ↓

 Save Conversation

              ↓

 Send WhatsApp Reply
```

---

# 🧠 Intent Detection

Every incoming message is classified before reaching the AI.

Examples include:

- Greeting
- Appointment Booking
- Appointment Cancellation
- Doctor Search
- Clinic Information
- Medical Question
- General Conversation
- Interactive Button
- Unknown Intent

This reduces unnecessary AI calls and improves performance.

---

# 📚 Retrieval-Augmented Generation (RAG)

The assistant does not rely solely on the language model.

Instead, it retrieves medical information from trusted PDF documents.

Workflow:

Medical PDF

↓

Embedding Generation

↓

ChromaDB

↓

Similarity Search

↓

Relevant Context

↓

Gemini

↓

Accurate Response

---

# 💬 Conversation Memory

The assistant maintains conversation history for every patient.

Capabilities include:

- Previous conversations
- Patient profile
- Appointment history
- Context-aware responses
- Personalized replies

---

# 📲 WhatsApp Features

Supported features include:

- Text Messages
- Interactive Buttons
- Smart Menus
- Appointment Booking
- AI Chat
- Duplicate Message Protection
- Conversation History

---

# 🛡 Business Rules

Business logic is separated from AI.

The AI **never performs database operations directly**.

Instead:

- Backend validates requests
- Business rules execute actions
- Database is updated
- AI generates only natural language responses

This architecture ensures reliability and prevents AI hallucinations in critical workflows.

---

# ⚡ Performance Optimizations

The platform includes several optimizations:

- Duplicate webhook detection
- Modular services
- Repository pattern
- Cached embeddings
- RAG retrieval
- Intent-first processing
- Reduced LLM usage
- Efficient database queries

---

# 🔄 Background Processing

Heavy operations are isolated from the main request flow whenever possible.

Examples include:

- Embedding generation
- Knowledge rebuilding
- File uploads
- Vector indexing

---

# 📂 Medical Knowledge Workflow

```text
Upload PDF

↓

Knowledge Folder

↓

Rebuild Embeddings

↓

Sentence Transformers

↓

ChromaDB

↓

Ready for AI Search
```

---

# 🏥 Real-World Use Cases

The platform can be used by:

- Private Clinics
- Medical Centers
- Hospitals
- Dental Clinics
- Diagnostic Centers
- Telemedicine Providers

---

# 📈 Scalability

The platform is designed to support:

- Multiple Clinics
- Thousands of Patients
- Large Medical Knowledge Bases
- AI Expansion
- Additional Modules
- Cloud Deployment
- SaaS Multi-Tenant Architecture

---
# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/AI-Medical-Assistant.git

cd AI-Medical-Assistant
```

---

## 2. Backend

```bash
cd backend

uv sync
```

Run the server

```bash
uv run uvicorn app.main:app --reload
```

---

## 3. Dashboard

```bash
cd dashboard

npm install

npm run dev
```

---

## 4. Cloudflare Tunnel

Expose the local backend.

```bash
cloudflared tunnel --url http://localhost:8000
```

Update the Meta WhatsApp Webhook URL if the tunnel changes.

---

# ⚙ Environment Variables

Create a `.env` file inside the backend.

```env
SUPABASE_URL=

SUPABASE_KEY=

GEMINI_API_KEY=

WHATSAPP_TOKEN=

PHONE_NUMBER_ID=

VERIFY_TOKEN=

HF_TOKEN=
```

---

# 📡 REST API

## Dashboard

```
GET /dashboard
```

---

## Patients

```
GET /patients

POST /patients
```

---

## Patient Details

```
GET /patient-details/{phone}
```

---

## Conversations

```
GET /conversations

GET /conversations/{phone}

DELETE /conversations/{phone}

DELETE /conversations/patient/{phone}
```

---

## Appointments

```
GET /appointments

POST /appointments

PATCH /appointments/{id}

DELETE /appointments/{id}
```

---

## Clinic

```
GET /clinic

PUT /clinic
```

---

## Knowledge

```
GET /knowledge/files

POST /knowledge/upload

POST /knowledge/rebuild

DELETE /knowledge/files/{filename}
```

---

## Analytics

```
GET /analytics
```

---

## AI Settings

```
GET /ai

PUT /ai
```

---

## WhatsApp Settings

```
GET /whatsapp

PUT /whatsapp
```

---

## Health

```
GET /health
```

---

# 📁 Project Structure

```text
AI-Medical-Assistant

backend/

dashboard/

knowledge/

chroma_db/

docs/

README.md
```

---

# 📦 Main Dependencies

Backend

- FastAPI
- Uvicorn
- Supabase
- Google Gemini
- Sentence Transformers
- ChromaDB
- Pydantic
- httpx

Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- TanStack Query
- React Router
- Shadcn UI
- Recharts
- Axios

---

# 🔒 Security

Current implementation includes

- Environment Variables
- API Layer Isolation
- Backend Business Rules
- Duplicate Message Protection
- Request Validation
- Input Validation
- Secure WhatsApp Cloud API

Future improvements

- Authentication
- Role Based Access
- Audit Logs
- Rate Limiting
- JWT Authentication
- Multi-Tenant Security

---

# 📈 Future Roadmap

The platform is continuously evolving.

Planned modules include

- Laboratory Module
- Radiology Module
- Pharmacy Module
- Billing System
- Online Payments
- Doctor Dashboard
- Patient Portal
- Calendar Integration
- Notifications
- Email Support
- Voice Assistant
- Image Analysis
- Medical Report Generation
- AI Triage
- Multi-language Support
- Multi-clinic SaaS
- Docker Deployment
- Kubernetes Deployment

---

# 💡 Challenges Solved

During development several real-world engineering challenges were solved.

Examples include

- WhatsApp duplicate webhook events
- AI hallucination during appointment booking
- Conversation state management
- Medical knowledge retrieval
- Prompt engineering
- Intent classification
- AI response validation
- Scalable modular architecture
- PDF knowledge indexing
- Embedding regeneration
- Patient profile extraction
- Conversation memory
- Dashboard integration
- REST API design

---

# 📚 What I Learned

This project significantly improved my practical experience in

- AI Engineering
- Backend Development
- FastAPI
- Software Architecture
- Clean Architecture
- Repository Pattern
- REST API Design
- RAG Systems
- Vector Databases
- LLM Integration
- Prompt Engineering
- Database Design
- React Development
- Dashboard Development
- SaaS Architecture
- WhatsApp Cloud API
- Production AI Systems

---

# 📄 License

This project is intended for educational, research, and portfolio purposes.

Commercial use requires appropriate licensing depending on third-party services such as Meta WhatsApp Business Cloud API and Google Gemini.

---

# 👨‍💻 Author

**Amjad Nazar**

AI Engineer • Backend Developer • Data Analyst

📧 Email

amgadnazar11@gmail.com

💼 LinkedIn

https://linkedin.com/in/amjad-nazar

🌐 Portfolio

https://amgadnazar.github.io/

🐙 GitHub

https://github.com/amgadnazar

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

🐞 Report issues

💡 Suggest improvements

Contributions are always welcome.

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the technologies that made this project possible.

- FastAPI
- React
- Supabase
- Google Gemini
- ChromaDB
- Sentence Transformers
- TailwindCSS
- Shadcn UI
- TanStack Query
- Meta WhatsApp Business Cloud API