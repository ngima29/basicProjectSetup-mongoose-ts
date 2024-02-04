import { Server, Socket } from 'socket.io';

class SocketManager {
  private static instance: SocketManager;
  private io: Server;

  private constructor(io: Server) {
    this.io = io;
    this.configureSocket();
  }

  static initialize(io: Server): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager(io);
    }
    return SocketManager.instance;
  }

  private configureSocket() {
    console.log("socked called")
    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected');

      const welcomeMessage = `Welcome, user with ID ${socket.id}!`;
      socket.emit('welcome-message', welcomeMessage);

      console.log(welcomeMessage);

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
}

export { SocketManager };
