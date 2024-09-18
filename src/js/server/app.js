import express from 'express';
import booksRoutes from '../routes/booksRoutes.js';
import cors from 'cors';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 20;

const APP = express();
APP.use(cors());
APP.use(express.json());
APP.use('/api/', booksRoutes);

APP.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000');
  }).on('error', (err) => {
    console.error('Error starting server:', err);
  });