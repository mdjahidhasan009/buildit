import cors from 'cors';
import express, { Application } from 'express';

const app: Application = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Server running successfully");
});

// app.use(globalExceptionHandler);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found',
    errorMessages: [
      {
        path: '',
        message: 'API not found'
      }
    ]
  });
});

export default app;
