// API client for calling backend Hono API

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

interface ApiResponse<T> {
  success: boolean
  data: T
  count?: number
  message?: string
}

// API call 1: Fetch users from backend
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('/api/users')
    const result: ApiResponse<User[]> = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch users')
    }
    
    return result.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// API call 2: Fetch posts from backend
async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('/api/posts')
    const result: ApiResponse<Post[]> = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch posts')
    }
    
    return result.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

// Display functions
function displayUsers(users: User[]): void {
  const container = document.getElementById('users')
  if (!container) return
  
  if (users.length === 0) {
    container.innerHTML = '<p class="error">No users found</p>'
    return
  }
  
  container.innerHTML = `
    <span class="count">${users.length} users</span>
    ${users.map(user => `
      <div class="data-item">
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>ID:</strong> ${user.id}</p>
      </div>
    `).join('')}
  `
}

function displayPosts(posts: Post[]): void {
  const container = document.getElementById('posts')
  if (!container) return
  
  if (posts.length === 0) {
    container.innerHTML = '<p class="error">No posts found</p>'
    return
  }
  
  container.innerHTML = `
    <span class="count">${posts.length} posts</span>
    ${posts.map(post => `
      <div class="data-item">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <p><strong>User ID:</strong> ${post.userId}</p>
      </div>
    `).join('')}
  `
}

function showLoading(elementId: string): void {
  const container = document.getElementById(elementId)
  if (container) {
    container.innerHTML = '<p class="loading">Loading...</p>'
  }
}

function showError(elementId: string, message: string): void {
  const container = document.getElementById(elementId)
  if (container) {
    container.innerHTML = `<p class="error">Error: ${message}</p>`
  }
}

// Event handlers
async function handleFetchUsers(): Promise<void> {
  showLoading('users')
  try {
    const users = await fetchUsers()
    displayUsers(users)
  } catch (error) {
    showError('users', error instanceof Error ? error.message : 'Unknown error')
  }
}

async function handleFetchPosts(): Promise<void> {
  showLoading('posts')
  try {
    const posts = await fetchPosts()
    displayPosts(posts)
  } catch (error) {
    showError('posts', error instanceof Error ? error.message : 'Unknown error')
  }
}

async function handleFetchBoth(): Promise<void> {
  showLoading('users')
  showLoading('posts')
  
  try {
    // Make both API calls in parallel
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
    ])
    
    displayUsers(users)
    displayPosts(posts)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    showError('users', message)
    showError('posts', message)
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const fetchUsersBtn = document.getElementById('fetchUsers')
  const fetchPostsBtn = document.getElementById('fetchPosts')
  const fetchBothBtn = document.getElementById('fetchBoth')
  
  fetchUsersBtn?.addEventListener('click', handleFetchUsers)
  fetchPostsBtn?.addEventListener('click', handleFetchPosts)
  fetchBothBtn?.addEventListener('click', handleFetchBoth)
})
