import express, { Request, Response } from 'express';
export const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());


app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
})