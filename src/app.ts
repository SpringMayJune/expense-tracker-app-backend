import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import indexRouter from './routes';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

connectDB();

app.get('/', (_req, res) => {
  res.send('Hello TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use('/api', indexRouter);

export default app;
