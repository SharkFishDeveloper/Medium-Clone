import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk

const app = new Hono();
// <{
//   Bindings:
//  { DATABASE_URL:string,
//   JWT_SECRET:string,
//   token:string
// },
// Variables:{
//   userId:string
// }
// }>

app.use("/*",cors(
 {
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials:true
 }
));
app.get("/",(c)=>{
  return c.json({message:"Hello from here"})
})

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

export default app;