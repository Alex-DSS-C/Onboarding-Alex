import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;

const libros = [
  { id: 1, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', categoria: 'Clásico' },
  { id: 2, titulo: '1984', autor: 'George Orwell', categoria: 'Ficción distópica' },
  { id: 3, titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', categoria: 'Novela' },
  { id: 4, titulo: 'Sapiens', autor: 'Yuval Noah Harari', categoria: 'Historia' },
  { id: 5, titulo: 'Atomic Habits', autor: 'James Clear', categoria: 'Desarrollo personal' }
];

app.get('/', (req: Request, res: Response) => {
  res.send('Hola desde biblioteca');
});

app.get('/api/libros', (req: Request, res: Response) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});