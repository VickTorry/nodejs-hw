// src/server.js

import express from 'express';
import cors from "cors";

import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

app.get('/notes', (req, res) => {
  res.status(200).json({
    "message": "Retrieved all notes",
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    "message": `Retrieved note with ID: ${noteId}`,
  });
});

// Маршрут для тестування middleware помилки
app.get('/test-error', (req, res) => {
  // Штучна помилка для прикладу
  throw new Error('Something went wrong');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'повідомлення про помилку',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
