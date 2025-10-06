# Job Portal Resume Upload (PDF up to 2MB)

## Backend (Express)
- cd backend
- .env already present:
  - PORT=5000
  - CLIENT_ORIGIN=http://localhost:5173
- Run: npm run dev (or npm start)

Endpoint: POST /upload (field: resume, PDF only, max 2MB)

## Frontend (React + Vite + Tailwind)
- cd frontend
- Run: npm run dev
- Open http://localhost:5173

The UI validates PDF type and size before upload and shows server messages.

Notes: Files saved in backend/uploads/. Update CLIENT_ORIGIN if needed.
