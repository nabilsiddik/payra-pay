import express, { Request, Response } from 'express';
export const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import passport from 'passport';
import './app/config/passport'
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;


dotenv.config();
app.use(express.json());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true
}));


app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
})

app.use(globalErrorHandler)