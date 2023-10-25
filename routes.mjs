import { Router } from "express";
import authHelper from "./routes/authHelper.mjs";
import authenticateToken from "./authenticateToken.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>TM Server Is Working Perfectly !!<h1/>");
});

router.use("/auth", authHelper);  // All the api's regarding auth is here inside authHelper

/*

  The apis which you want to 
  Run without token validation should be here
  Before router.use(authenticateToken); 

*/

router.use(authenticateToken);  // Here we are validating all the token

/*

  The apis which you want to 
  Run after token validation should be here
  After router.use(authenticateToken); 

*/

export default router;