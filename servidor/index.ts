import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '..', '..');

const libros = [
  { id: 1, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', categoria: 'Clásico' },
  { id: 2, titulo: '1984', autor: 'George Orwell', categoria: 'Ficción distópica' },
  { id: 3, titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', categoria: 'Novela' },
  { id: 4, titulo: 'Sapiens', autor: 'Yuval Noah Harari', categoria: 'Historia' },
  { id: 5, titulo: 'Atomic Habits', autor: 'James Clear', categoria: 'Desarrollo personal' }
];

app.use(express.static(frontendDir));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.get('/api/libros', (req: Request, res: Response) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});