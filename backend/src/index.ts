import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk
app.post('/api/v1/user/signup',(c)=>{
  return c.json({message:"Signup route"})
})

app.post('/api/v1/user/signin',(c)=>{
  return c.json({message:"user/signin"})
})
app.post('/api/v1/user/blog',(c)=>{
  return c.json({message:"user/blog"})
})

app.get('/api/v1/blog/:id',(c)=>{
  return c.json({message:"blog/:id"})
})

app.post('/api/v1/user/blog',(c)=>{
  return c.json({message:"blog"})
})

app.get('/api/v1/blog/bulk',(c)=>{
  return c.json({message:"bulk"})
})
export default app
