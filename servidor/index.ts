import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;

// ─── Configuración de rutas del frontend ────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '..', '..');

// ─── Conexión a PostgreSQL con variables de entorno ─────────────────────────
const pool = new Pool({
  host:     process.env.DB_HOST     ?? 'localhost',
  port:     Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME     ?? 'biblioteca_db',
  user:     process.env.DB_USER     ?? 'postgres',
  password: process.env.DB_PASSWORD,
});

// ─── App Express ────────────────────────────────────────────────────────────
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static(frontendDir));

// GET / → sirve el index.html del frontend
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// GET /api/libros → trae todos los libros de PostgreSQL
app.get('/api/libros', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, titulo, autor, anio FROM libros ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ error: 'Error al conectar con la base de datos' });
  }
});

// POST /api/libros → inserta un nuevo libro en PostgreSQL
app.post('/api/libros', async (req: Request, res: Response) => {
  const { titulo, autor, anio } = req.body as {
    titulo?: string;
    autor?: string;
    anio?: number;
  };

  if (!titulo || !autor || !anio) {
    res.status(400).json({ error: 'Se requieren titulo, autor y anio' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO libros (titulo, autor, anio) VALUES ($1, $2, $3) RETURNING *',
      [titulo, autor, anio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar libro:', error);
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
});

// ─── Inicio del servidor ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Conectado a PostgreSQL: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
});