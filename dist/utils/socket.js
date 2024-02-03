"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
class SocketManager {
    constructor(io) {
        this.io = io;
        this.configureSocket();
    }
    static initialize(io) {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager(io);
        }
        return SocketManager.instance;
    }
    configureSocket() {
        this.io.on('connection', (socket) => {
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
exports.SocketManager = SocketManager;
