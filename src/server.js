// src/server.js

import express from 'express';
import cors from "cors";
// import mongoose from 'mongoose';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
// import { Note } from './models/note.js';
import { errors } from "celebrate";

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(logger);
app.use(express.json());
app.use(cors());
app.use(notesRoutes);


// app.get('/__diag', async (req, res, next) => {
//   try {
//     const { host, name, readyState } = mongoose.connection;
//     const count = await Note.estimatedDocumentCount(); // in current DB
//     res.json({ host, dbName: name, readyState, collection: Note.collection.name, count });
//   } catch (e) { next(e); }
// });

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
