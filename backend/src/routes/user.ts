import express from "express";

import { fetchUser } from "../middleware/fetchUser";
import { getUserdetails, changePassword } from "../controller/user";

export default (router: express.Router) => {
  router.get("/user/users", fetchUser, getUserdetails);
  router.put("/user/users/:id", fetchUser, changePassword);
};
