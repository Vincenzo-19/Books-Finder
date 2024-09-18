import express from 'express';
import booksRoutes from '../routes/booksRoutes.js';
const APP = express();
import path from 'path';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 20;

APP.use(express.json());
APP.use(express.static(path.join(__dirname, 'dist')))
APP.use('/api/', booksRoutes);

APP.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000');
  }).on('error', (err) => {
    console.error('Error starting server:', err);
  });