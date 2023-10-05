/*
 
  @ Pushpendra
  Desc - Started Project
  Date - 05/10/23
 
 */

  import express from "express";
  import cors from "cors";
  import bodyParser from "body-parser";
  import routes from "./routes.mjs";
  import * as dotenv from "dotenv";
  dotenv.config();
  
  const app = express();
  
  app.use(cors());
  app.use(bodyParser.json());
  
  // Always use routes in last
  // Here in routes we have all our routes
  app.use(routes);
  
  app.listen(process.env.PORT, () => {
    console.log("Your backend is running on :", process.env.PORT)
  });