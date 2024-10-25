import express from "express";
import {AuthController} from "../controllers/auth_controller";

const authRouter = express.Router();

authRouter.post("/auth/register", (req,res,next)=>{
   AuthController.register(req,res,next);
}); 

export default authRouter;
