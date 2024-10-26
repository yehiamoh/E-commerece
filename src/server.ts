import express from"express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import authRouter from "./routes/auth_router";
import errorHandler from "./services/error_handler";

dotenv.config();

const port =process.env.PORT||8080;

function start(){
   try{
      const app=express();
      app.use(bodyParser.json());
      app.use("/api/V0",authRouter);



      app.use(errorHandler);
      app.listen(port,()=>{
         console.log(`server is running on port : ${port}`)
      });
   }
   catch(error:any){
      console.log(`error in running server \n ${error.toString()}`)
   }
}
start();