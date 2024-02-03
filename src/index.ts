import cors from 'cors';
import express, { Express } from 'express';
import * as errorHandler from './middlewares/errorHandler';
import globalError from './middlewares/globalErrorHandler';
import { Database, port } from './config';
import { proxyRouter } from './routes';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import path from 'path';
import { SocketManager } from './utils';

class Server {
  private app: Express;
  private httpServer: HTTPServer;
  private io: SocketIOServer;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new SocketIOServer(this.httpServer);

    this.configureServer();
    SocketManager.initialize(this.io);
  }

  private configureServer() {
    this.app.set('port', port);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/images', express.static('public/images'));
    this.app.use('/api', proxyRouter.map());

    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected');
     
      const welcomeMessage = `Welcome, user with ID ${socket.id}!`;
      socket.emit('welcome-message', welcomeMessage);

      // Log the welcome message on the server
      console.log(welcomeMessage);

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    const publicPath = path.resolve(__dirname, 'public');
    console.log('Public Path:', publicPath);

    this.app.use(express.static(publicPath));
    this.app.get('/', (req, res) => {
      const indexPath = path.resolve(publicPath, 'index.html');
      console.log('Index Path:', indexPath);
      return res.sendFile(indexPath);
    });

    this.app.use(errorHandler.genericErrorHandler);
    this.app.use(errorHandler.methodNotAllowed);
    this.app.use(errorHandler.notFound);
    this.app.use(globalError);
  }

  private async connectDB() {
    await Database.connect();
  }

  public start() {
    this.connectDB();
    this.httpServer.listen(this.app.get('port'), () =>
      console.log(`App running on PORT ${port}`)
    );
  }
}

const server = new Server();
server.start();
