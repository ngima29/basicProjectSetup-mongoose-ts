import cors, { CorsOptions } from "cors";
import express, { Express } from "express";
import errorHandle from './middlewares/errorHandler';
import { Database, port } from './config';
import ArticleRoute from './routes/articleRoute'

class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.configuration();
  }

  private configuration() {
    this.app.set("port", port);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/images', express.static('public/images'))

    //Api
    this.app.use("/api/article", ArticleRoute);
    //Error Handler
    this.app.use(errorHandle)
  }

  private async connectDB() {
    await Database.connect();
  }

  public start() {

    this.connectDB();
    this.app.listen(this.app.get("port"), () =>
      console.log(`App running on PORT ${port}`)
    );
  }
}

const server = new Server();
server.start();
