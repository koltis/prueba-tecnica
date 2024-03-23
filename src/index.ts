import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import productos from "./routes/productos";
import auth from "./routes/auth";
import bodyParser from "body-parser";
import winston from "winston";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json()
  ),
  transports: [new winston.transports.Console()],
});

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  }
);

app.use(morganMiddleware);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/productos", productos);
app.use("/auth", auth);

app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
