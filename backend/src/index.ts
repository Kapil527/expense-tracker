import express, { Express, Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

import connect from "./db";
import routes from "./routes";
import { errorhandling } from "./middleware/errorhandling";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PORT } = process.env;
const server = http.createServer(app);

connect();

app.use("/api/v1", routes());

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(errorhandling);
