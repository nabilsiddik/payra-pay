import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import passport from 'passport';
import './app/config/passport'
import cookieParser from "cookie-parser";
dotenv.config();

export const app = express();
app.set('trust proxy', 1)
app.use(cors({
  origin: [
      "https://parya-pay-frontend.vercel.app",
      "http://localhost:5173"
    ],
  credentials: true,
}))


app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
})

app.use(globalErrorHandler)