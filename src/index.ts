import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use('/api', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, ToDo App!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
