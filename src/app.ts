import cors from 'cors';
import mongoose from 'mongoose';
import express, { Application } from 'express';
import config from "./config";
import path from "path";

const app: Application = express();

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

if(process.env.NODE_ENV === 'local') {
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
} else {
  app.use(cors({ credentials: true }));
}
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'frontend', 'dist','index.html'));
  });
}

const dbConnect = async () => {
  try {
    if(!config.mongoose.url) {
        throw new Error("MONGODB_URL not found");
    }

    await mongoose.connect(config.mongoose.url);
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

dbConnect();

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
