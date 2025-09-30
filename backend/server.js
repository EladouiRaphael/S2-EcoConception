import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { WebSocketServer } from 'ws'
import { createServer } from 'http'

const app = express()
const PORT = process.env.PORT || 5001

// --- RPS Middleware (doit être AVANT routes/static) ---
const rpsWindow = new Array(10).fill(0) // 10 "tranches" de 100ms = 1s
let rpsIndex = 0

setInterval(() => {
  rpsIndex = (rpsIndex + 1) % rpsWindow.length
  rpsWindow[rpsIndex] = 0
}, 100)

app.use((req, res, next) => {
  rpsWindow[rpsIndex]++
  next()
})

app.use((_, res, next) => {
  res.set('Timing-Allow-Origin', '*')
  next()
})

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(compression())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --- Static assets avec CORS et COEP ---
app.use(
  '/static',
  (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    res.set('Cross-Origin-Opener-Policy', 'same-origin')
    res.set('Cross-Origin-Embedder-Policy', 'require-corp')
    next()
  },
  express.static(path.join(__dirname, 'static'), {
    extensions: ['js', 'css', 'jpg', 'webp', 'avif'],
    // Optimisation : Configuration du cache pour les ressources statiques
    maxAge: '7d', // Cache de 7 jours
    immutable: true, // Indique que le fichier ne changera pas
    cacheControl: true,
    lastModified: true,
    etag: true
  })
)

// --- API server ---
app.get('/api/server', (_, res) => {
  res.set('Cache-Control', 'no-store')
  const rps = rpsWindow.reduce((a, b) => a + b, 0)
  res.json({
    memory: process.memoryUsage().rss,
    load: +os.loadavg()[0].toFixed(2),
    rps
  })
})

// --- API payload ---
app.get('/api/payload', (_, res) => {
  const block = 'x'.repeat(1_024)
  const big = Array(1_024).fill(block)
  res.json({ data: big, ts: Date.now() })
})

// Création du serveur HTTP
const server = createServer(app);

// Configuration du WebSocket Server
const wss = new WebSocketServer({ server });

// Stockage des statistiques
let currentStats = {
  memory: 0,
  load: 0,
  rps: 0
};

// Fonction pour envoyer les mises à jour aux clients WebSocket
function broadcastStats() {
  const stats = {
    memory: process.memoryUsage().rss,
    load: +os.loadavg()[0].toFixed(2),
    rps: rpsWindow.reduce((a, b) => a + b, 0)
  };
  
  // Ne diffuser que si les valeurs ont changé significativement (>5%)
  const hasSignificantChange = Object.keys(stats).some(key => {
    const change = Math.abs(stats[key] - currentStats[key]) / currentStats[key];
    return change > 0.05;
  });

  if (hasSignificantChange) {
    currentStats = stats;
    const message = JSON.stringify(stats);
    wss.clients.forEach(client => {
      if (client.readyState === 1) { // 1 = WebSocket.OPEN
        client.send(message);
      }
    });
  }
}

// Mise à jour des stats toutes les 2 secondes
setInterval(broadcastStats, 2000);

// Gestion des connexions WebSocket
wss.on('connection', (ws) => {
  console.log('Nouveau client WebSocket connecté');
  
  // Envoi des stats initiales
  ws.send(JSON.stringify(currentStats));
  
  ws.on('close', () => {
    console.log('Client WebSocket déconnecté');
  });
});

// Modification de l'API payload pour réduire la taille des données
app.get('/api/payload', (_, res) => {
  // Optimisation : Réduction de la taille du payload à 1KB au lieu de 1MB
  const data = {
    timestamp: Date.now(),
    metrics: {
      cpu: os.loadavg()[0],
      memory: process.memoryUsage().heapUsed,
      uptime: process.uptime()
    },
    // Données exemple plus légères
    sample: 'x'.repeat(1024) // 1KB de données au lieu de 1MB
  };
  
  // Ajout des en-têtes de cache
  res.set('Cache-Control', 'public, max-age=5'); // Cache de 5 secondes
  res.json(data);
});

server.listen(PORT, () => console.log(`Backend running on port ${PORT} with WebSocket support`));