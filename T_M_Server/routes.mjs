import { Router } from "express";
import authHelper from "./routes/authHelper.mjs";
import authenticateToken from "./authenticateToken.js";
import tmHelper from "./routes/tmHelper.mjs";

const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>TM Server Is Working Perfectly !!<h1/>");
});

router.use("/auth", authHelper);  // All the api's regarding auth is here inside authHelper

router.use(authenticateToken);  // Here we are validating all the token

router.use("/tm", tmHelper);  // All the api's regarding teacher's management is here

export default router;