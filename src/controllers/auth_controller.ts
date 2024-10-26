import { PrismaClient,User,Role } from "@prisma/client";
import { Request,Response,NextFunction, RequestHandler } from "express";
import bcrypt from "bcrypt"
import joi from "joi";

const prisma =new PrismaClient();

 export class AuthController{
   public static register:RequestHandler=async(req:Request,res:Response,next):Promise<void>=>{
      const registerSchema =joi.object({
         name: joi.string().required(),
         email: joi.string().email().required(),
         password: joi.string().min(6).required(),
         address: joi.string().required(),
         phone: joi.string().required(),
         role: joi.string().valid("admin", "user").required()
      });
      try{
         const {name,email,password,address,phone,role}=req.body;
         const {error}=registerSchema.validate(req.body);
         if(error){
             res.status(400).json( {message: error.details[0].message});
             return;
         }
         const hashedPassword=await bcrypt.hash(password,10);
         const user= await prisma.user.create({
            data:{
            name:name,
            email:email,
            password:hashedPassword,
            address:address,
            phone:phone,
            role:role ==="admin"?Role.admin:Role.user,
            }
         });
         res.status(201).json({
            user_id:user.user_id,
            email:user.email,
            password:user.password,
            role:user.role, 
         });
         return;
      }
      catch(error:any){
        console.log(error);
        next(error);
      }
   }
   public static login :RequestHandler=async(req:Request,res:Response,next:NextFunction)=>{

   }
}
