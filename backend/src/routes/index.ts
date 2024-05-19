import express from "express";

import auth from "./auth";
import user from "./user";
import expense from "./expense";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  user(router);
  expense(router);
  return router;
};
