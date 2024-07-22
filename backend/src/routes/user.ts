import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign,verify } from "hono/jwt";
import { Bindings } from "hono/types";
import { signupInput } from 'overlordzeroking-common-medium';


export const userRouter = new Hono<{
  Bindings:{
    JWT_SECRET:string,
        DATABASE_URL:string
  }
}>();

userRouter.post('/signup',async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
      const body = await c.req.json();
      console.log(body);
      
      const {success} = signupInput.safeParse(body);
      if(!success){
        c.status(400);
        return c.json({message:"Invalid inputs !!"})
      }
      console.log(body);
      const findUser = await prisma.user.findUnique({
        where:{
          email:body.email
        }
      })
      if(findUser){
        c.status(400);
        return c.json({message:"User already exists !!"})
      }
    const user = await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.name
      }
    })
    const jwt = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({message:jwt})
    } catch (error) {
      console.log(error)
      return c.json({message:"Invalid signup",error:error});
    }
  })
  
  userRouter.post('/signin',async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
      const body = await c.req.json();
      const {success} = signupInput.safeParse(body);
      if(!success){
        c.status(400);
        return c.json({message:"Invalid inputs !!"})
      }
      const user = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      });
      if(user){
       if(user.password!==body.password){
        c.status(403);
        return c.json({message:"Invalid password"})
       }
       const jwt = await sign({id:user.id},c.env.JWT_SECRET);
       console.log("User",user);
       return c.json({message:jwt})
      }else{
        c.status(403);
        return c.json({message:"User does not exist !!"}) 
      }
    } catch (error) {
      console.log(error);
      return c.json({message:error})
    }
  })

  userRouter.post("/get",async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
      const body = await c.req.json();
      var token = body.token;
      token = token.split(" ")[1];
      console.log(token);
      const decodedToken =  decode(token);
      if(!token){
        c.status(400);
        return c.json({message:"Invalid token !!"})
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.payload.id
        },
        select:{
          name:true
        }
      });
      console.log(user);
      if(user){
       return c.json({message:user})
      }else{
        c.status(403);
        return c.json({message:"User does not exist !!"}) 
      }
    } catch (error) {
      console.log(error);
      return c.json({message:error})
    }
  });