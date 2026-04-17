# יום העצמאות RSVP 🇮🇱🔥

Party menu RSVP app for an Israeli Independence Day BBQ.  
Guests pick their meat & drink preference; the host sees a live dashboard.

---

## Quick Start

```bash
# 1. Install all dependencies (root + server + client)
npm run install:all

# 2. Start both servers with one command
npm run dev
```

- Guest app → http://localhost:5173
- Host dashboard → http://localhost:5173/host (password: `bbq2025`)
- API server → http://localhost:3001

---

## Project Structure

```
/
├── package.json          # root — runs both servers via concurrently
├── rsvp.db               # SQLite database (auto-created on first run)
│
├── server/
│   ├── src/index.ts      # Express API + SQLite
│   ├── package.json
│   └── tsconfig.json
│
└── client/
    ├── index.html
    ├── vite.config.ts    # proxies /api → localhost:3001
    └── src/
        ├── App.tsx
        ├── RSVPFlow.tsx
        ├── global.css
        ├── types.ts
        ├── screens/
        │   ├── Landing.tsx
        │   ├── NameInput.tsx
        │   ├── MeatQuestion.tsx
        │   ├── DrinkQuestion.tsx
        │   └── Confirmation.tsx
        └── host/
            ├── HostPage.tsx
            ├── HostLogin.tsx
            └── HostDashboard.tsx
```

---

## API

| Method | Path              | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/api/rsvp`       | Submit a guest RSVP          |
| GET    | `/api/responses`  | Get all responses (dashboard)|

### POST /api/rsvp body
```json
{
  "name": "יעל",
  "meat": "אנטריקוט",
  "drink_type": "בירה",
  "drink_detail": "בירה בהירה"
}
```

---

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + React Router v6
- **Backend:** Express + better-sqlite3 + TypeScript (tsx)
- **Styling:** Custom CSS (RTL, mobile-first, Rubik font)
- **Dev runner:** concurrently

---

## Notes

- The SQLite database file `rsvp.db` is created automatically in the project root on first server start.
- The host dashboard auto-refreshes every 30 seconds.
- CSV export includes a UTF-8 BOM so Hebrew renders correctly in Excel.
