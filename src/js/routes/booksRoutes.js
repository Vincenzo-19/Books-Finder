import express from 'express';
import { getBooks, getBookDetails } from '../controllers/booksController.js';

const ROUTER = express.Router();

ROUTER.get('/books', getBooks)     

ROUTER.get('/book/works/:key', getBookDetails)

export default ROUTER;