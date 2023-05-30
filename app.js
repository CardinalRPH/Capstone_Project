import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { default as indexRouter } from './routes/index.js';
import { default as usersRouter } from './routes/users.js';

const __dirname = path.resolve();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors({
    origin: 'http://localhost',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

export default app;
