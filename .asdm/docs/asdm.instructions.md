# QA Live Healthcare - AI Agent Instructions

## Project Overview
Healthcare consultation platform with microservices backend (Spring Boot) and Vue.js frontend for real-time Q&A between patients and doctors. **Frontend runs standalone with mock data** - backend services are minimal scaffolds.

## Architecture

### Services
- **qa-service-user** (8080): Basic scaffold with CORS, Actuator, test endpoint `/api/test/cors`
- **qa-service-question** (8081): Minimal scaffold (config only, no controllers)
- **qa-service-statistic**: Empty placeholder (only `.gitkeep`)
- **Frontend** (5173): Vue 3.5 + TypeScript 5.5 + Ant Design Vue 4.2 + Vite

### Current State
- Frontend fully functional with mock data (`web/qa-web/src/data/*.json`)
- Backend services are scaffolds - only user service has test controller
- No database - prepared for future REST API integration
- CORS: `server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/config/CorsConfig.java`

## Development Workflows

### Backend (Spring Boot)
```bash
cd server/qa-service-user && ./mvnw spring-boot:run  # Only service with endpoints
./mvnw clean install                                   # If dependencies changed
curl http://localhost:8080/api/test/cors              # Test CORS
```

**Actuator endpoints** (user service only): `/actuator/{health,info,metrics,env,beans,loggers}`

### Frontend (Vue 3 + Vite)
```bash
cd web/qa-web && npm run dev    # Dev server :5173 (standalone, no backend needed)
npm run build                    # Production (vue-tsc + vite build)
npm run preview                  # Preview production
```

All data from `src/data/{doctor-user-list,patient-user,question-list}.json`

## Key Patterns

### Backend
- **Package**: `com.leansofx.{service}.{layer}` - config, controller, test structure
- **CORS**: `CorsConfig.java` implements `WebMvcConfigurer`, allows all origins with credentials
- **Config**: `application.properties` sets port (user=8080, question=8081), Actuator endpoints

### Frontend
- **State**: Reactive store pattern (`store/index.ts`) - NOT Vuex/Pinia
  - Methods: `store.loginDoctor()`, `store.addQuestion()`, `store.answerQuestion()`
  - Returns values (e.g., `loginDoctor` → `Doctor | null`)
  - No localStorage/sessionStorage - all in reactive state
  
- **Routes** (`router/index.ts`):
  - `/` - Patient home
  - `/consultation/:doctorUsername?` - Consultation (optional param)
  - `/doctor/login` - Doctor auth
  - `/doctor/room/:username` - Doctor dashboard
  - `/doctors` - Doctor list
  
- **Structure**:
  - `views/` - Pages (DoctorRoom, Consultation, Home, etc.)
  - `components/` - Reusables (AppHeader, AppFooter)
  - `data/` - Mock JSONs
  - All use `<script setup lang="ts">`
  
- **Styling**: Scoped CSS, gradient `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`, breakpoint `@media (max-width: 768px)`, individual icon imports

## Data Models (in `store/index.ts`)

**Doctor**: `{ id, username, password, name, title, department, avatar, experience, specialties[], isActive }`  
**Patient**: `{ id: "patient{timestamp}", name, birthday: "YYYY-MM-DD", phone, gender }`  
**Question**: `{ id: "q{timestamp}", patientId, patientName, doctorId, doctorName, question, submitTime: ISO8601, status: 'pending'|'answered', answer: string|null, answerTime: string|null }`

## Critical Flows

### Authentication
- **Patients**: Name + birthday (creates if new) → `store.verifyPatient()`
- **Doctors**: Username + password → `store.loginDoctor()`
- No JWT/sessions - client-side state (`currentPatient`, `currentDoctor`)

### Question Flow
1. Patient selects doctor or uses URL `/consultation/{username}`
2. Form validates doctor + question → `store.addQuestion()` (status: `pending`)
3. Doctor sees in pending list → reply text or mark as "已口述解答"

### Doctor Room
- Pending/answered sections, room URL `/consultation/${username}`, refresh button

## Common Tasks

**Add Service**: Create `server/{name}/`, copy Maven wrapper from existing, set port in `application.properties`, add CORS if needed  
**Add View**: Create in `views/`, add route in `router/index.ts`, update `AppHeader.vue` nav, use scoped CSS  
**Mock Data**: Edit `src/data/*.json` (hot reloads), match interfaces in `store/index.ts`

## Tech Stack
Java 17, Spring Boot 3.5.7, Vue 3.5.10, TypeScript 5.5.3, Ant Design Vue 4.2.6

## Notes
- Services are independent (changes isolated)
- Frontend standalone (no backend for dev)
- UI in Chinese - maintain consistency
- Test login: `dr-zhang-wei` / `123456`
- Always configure CORS for new endpoints
