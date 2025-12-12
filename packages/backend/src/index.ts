import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// Sample data
interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  userId: number
  title: string
  content: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
]

const posts: Post[] = [
  { id: 1, userId: 1, title: 'First Post', content: 'This is my first post!' },
  { id: 2, userId: 1, title: 'Second Post', content: 'Another amazing post' },
  { id: 3, userId: 2, title: "Jane's Post", content: 'Hello from Jane!' },
  { id: 4, userId: 3, title: "Bob's Thoughts", content: 'Sharing my thoughts here' },
]

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to Hono API',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
    },
  })
})

// API endpoint 1: Get all users
app.get('/api/users', (c) => {
  return c.json({
    success: true,
    data: users,
    count: users.length,
  })
})

// API endpoint 1a: Get user by ID
app.get('/api/users/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const user = users.find((u) => u.id === id)
  
  if (!user) {
    return c.json({ success: false, message: 'User not found' }, 404)
  }
  
  return c.json({
    success: true,
    data: user,
  })
})

// API endpoint 2: Get all posts
app.get('/api/posts', (c) => {
  return c.json({
    success: true,
    data: posts,
    count: posts.length,
  })
})

// API endpoint 2a: Get post by ID
app.get('/api/posts/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const post = posts.find((p) => p.id === id)
  
  if (!post) {
    return c.json({ success: false, message: 'Post not found' }, 404)
  }
  
  return c.json({
    success: true,
    data: post,
  })
})

// API endpoint 2b: Get posts by user ID
app.get('/api/users/:userId/posts', (c) => {
  const userId = parseInt(c.req.param('userId'))
  const userPosts = posts.filter((p) => p.userId === userId)
  
  return c.json({
    success: true,
    data: userPosts,
    count: userPosts.length,
  })
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// Start the server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

console.log(`Server is running on http://localhost:${port}`)
serve({
  fetch: app.fetch,
  port,
})

export { app }
export default app
