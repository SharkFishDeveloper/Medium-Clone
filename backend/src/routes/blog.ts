import { PrismaClient } from '@prisma/client/edge'   
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { bodyLimit } from 'hono/body-limit';
import { sign,verify } from "hono/jwt";
import { Bindings } from "hono/types";
import { createBlogInput, updateBlogInput } from 'overlordzeroking-common-medium';


export const blogRouter = new Hono<
{
    Bindings:{
        JWT_SECRET:string,
        DATABASE_URL:string
    },
    Variables:{
        userId:string
    }
}>();

blogRouter.use("/*",async(c,next)=>{
    const userId = await c.req.header("Authorization");
    const token = userId?.split(" ")[1];
    if(token==""){
      c.status(404);
      return c.json({message:"Please sign in"})
    }
    try {
      // @ts-ignore
      const verifyUser = await verify(token,c.env.JWT_SECRET);
      console.log("middleware userId",verifyUser.id);
      c.set("userId",verifyUser.id);
      console.log("Middleware for blog");
      
     await next();
    } catch (error) {
      c.status(404);
      return c.json({message:"Please sign in"})
    }
  })




  blogRouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    console.log("Blog starts");
    try {
      const body = await c.req.json();
      const {success} = createBlogInput.safeParse(body);
      if(!success){
        c.status(400);
        return c.json({message:"Invalid inputs !!"})
      }
      console.log("body of creating post",body);
      console.log("start");
      const id = c.get("userId");
      

      if(!id){
        c.status(404);
        return c.json({message:"Please sign in"})
      }

      const createPost = await prisma.post.create({
        data:{
          title: body.title,
          content: body.content,
          authorId: id
        }
      })

      console.log("end");
      return c.json({message:"Blog post created !!",idofBlog:createPost.id})
    } catch (error) {
      c.status(400);
      return c.json({message:"Unable to create blog !!"})
    }
  })
  


  blogRouter.put('/', async(c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
      const id = c.get("userId")
      const body = await c.req.json();
      const {success} = updateBlogInput.safeParse(body);
      if(!success){
        c.status(400);
        return c.json({message:"Invalid inputs !!"})
      }
      if(!id||!body.id){
        return c.json({message:"Select blog to update !!"})
      }
      const udpatedBlog = await prisma.post.update({
        where:{
          id:body.id,
          authorId:id
        },
        data:{
          title:body.title,
          content:body.content
        }
      })
      return c.json({message:udpatedBlog})
    } catch (error) {
      c.status(404);
      return c.json({message:"Unable to update !!"})
    }
  })

  

  blogRouter.get('/bulk',async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
      const id = c.get("userId");
      if(!id){
        return c.json({message:"Please signin to continue ..."})
      }
      const blogs = await prisma.post.findMany({});
      return c.json({message:blogs})
    } catch (error) {
      c.status(404);
      return c.json({message:"Unable to get all blogs !!"})
    }

  })

  blogRouter.get('/:id', async(c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
      console.log("start");
      const id = c.get("userId");
      const blogID =  c.req.param('id');
      console.log("end");
      console.log("blog id is -> ",blogID)
      if(!id||!blogID){
        return c.json({message:"Select blog to update !!"})
      }
      const blog = await prisma.post.findUnique({
        where:{
          id:blogID
        }
      })
      return c.json({message:blog})
    } catch (error) {
      c.status(400);
      return c.json({message:"Unable to find blog !!"})
    }
  })

