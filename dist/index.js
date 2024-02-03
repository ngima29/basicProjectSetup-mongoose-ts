"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errorHandler = __importStar(require("./middlewares/errorHandler"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
        this.configureServer();
        utils_1.SocketManager.initialize(this.io);
    }
    configureServer() {
        this.app.set('port', config_1.port);
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use('/images', express_1.default.static('public/images'));
        this.app.use('/api', routes_1.proxyRouter.map());
        this.io.on('connection', (socket) => {
            console.log('A user connected');
            const welcomeMessage = `Welcome, user with ID ${socket.id}!`;
            socket.emit('welcome-message', welcomeMessage);
            // Log the welcome message on the server
            console.log(welcomeMessage);
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
        const publicPath = path_1.default.resolve(__dirname, 'public');
        console.log('Public Path:', publicPath);
        this.app.use(express_1.default.static(publicPath));
        this.app.get('/', (req, res) => {
            const indexPath = path_1.default.resolve(publicPath, 'index.html');
            console.log('Index Path:', indexPath);
            return res.sendFile(indexPath);
        });
        this.app.use(errorHandler.genericErrorHandler);
        this.app.use(errorHandler.methodNotAllowed);
        this.app.use(errorHandler.notFound);
        this.app.use(globalErrorHandler_1.default);
    }
    async connectDB() {
        await config_1.Database.connect();
    }
    start() {
        this.connectDB();
        this.httpServer.listen(this.app.get('port'), () => console.log(`App running on PORT ${config_1.port}`));
    }
}
const server = new Server();
server.start();
