import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("visitors.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    user_agent TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Migration: Add country column if it doesn't exist
try {
  const tableInfo = db.prepare("PRAGMA table_info(visits)").all() as any[];
  const hasCountry = tableInfo.some(column => column.name === 'country');
  if (!hasCountry) {
    db.exec("ALTER TABLE visits ADD COLUMN country TEXT DEFAULT 'Unknown'");
    console.log("Added country column to visits table");
  }
} catch (e) {
  console.error("Migration failed", e);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to log a visit
  app.post("/api/visit", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    
    let country = "Unknown";
    try {
      // Simple IP to Country lookup (Free API)
      const cleanIp = Array.isArray(ip) ? ip[0] : ip?.split(',')[0].trim();
      if (cleanIp && cleanIp !== '::1' && cleanIp !== '127.0.0.1') {
        const geoRes = await fetch(`http://ip-api.com/json/${cleanIp}?fields=country`);
        const geoData = await geoRes.json();
        if (geoData.country) country = geoData.country;
      }
    } catch (e) {
      console.error("Geo lookup failed", e);
    }

    const stmt = db.prepare("INSERT INTO visits (ip, country, user_agent) VALUES (?, ?, ?)");
    stmt.run(ip, country, userAgent);

    const countStmt = db.prepare("SELECT COUNT(*) as count FROM visits");
    const { count } = countStmt.get() as { count: number };

    res.json({ success: true, count });
  });

  // API Route to get total count
  app.get("/api/visit-count", (req, res) => {
    const countStmt = db.prepare("SELECT COUNT(*) as count FROM visits");
    const { count } = countStmt.get() as { count: number };
    res.json({ count });
  });

  // Private API Route to get stats (Protected by password)
  app.post("/api/admin/stats", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(500).json({ error: "Server configuration error: ADMIN_PASSWORD not set" });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const stmt = db.prepare("SELECT * FROM visits ORDER BY timestamp DESC LIMIT 200");
    const logs = stmt.all();
    res.json(logs);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
