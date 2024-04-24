import express, { Express, Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";

import connect from "./db";

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer();

connect();

app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});
