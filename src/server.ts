import { Server } from 'http';
import app from './app';
import config from "./config";

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    console.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.warn('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.warn('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();