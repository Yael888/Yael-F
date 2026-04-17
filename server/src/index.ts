import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? true
    : ['http://localhost:5173', 'http://localhost:4173'],
}));
app.use(express.json());

const db = new Database(path.join(__dirname, '../../rsvp.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    meat TEXT NOT NULL,
    drink_type TEXT NOT NULL,
    drink_detail TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// POST /api/rsvp — save a guest response
app.post('/api/rsvp', (req, res) => {
  const { name, meat, drink_type, drink_detail } = req.body as {
    name: string;
    meat: string;
    drink_type: string;
    drink_detail?: string;
  };

  if (!name?.trim() || !meat || !drink_type) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const stmt = db.prepare(
    'INSERT INTO responses (name, meat, drink_type, drink_detail) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(name.trim(), meat, drink_type, drink_detail || null);

  res.json({ id: result.lastInsertRowid, success: true });
});

// GET /api/responses — return all responses (host dashboard)
app.get('/api/responses', (_req, res) => {
  const rows = db.prepare('SELECT * FROM responses ORDER BY created_at DESC').all();
  res.json(rows);
});

// In production, serve the built React app from Express
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🍖 RSVP Server running on http://localhost:${PORT}`);
});
