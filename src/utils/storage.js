// This is the ONLY file allowed to touch localStorage directly.
// Every other file asks THIS file to read/write data.

const KEYS = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  LIKES: 'likes',
  CURRENT_USER: 'currentUser',
}

function getItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (err) {
    console.error(`Failed to read "${key}" from localStorage`, err)
    return fallback
  }
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const storage = {
  getUsers: () => getItem(KEYS.USERS, []),
  setUsers: (users) => setItem(KEYS.USERS, users),

  getPosts: () => getItem(KEYS.POSTS, []),
  setPosts: (posts) => setItem(KEYS.POSTS, posts),

  getComments: () => getItem(KEYS.COMMENTS, []),
  setComments: (comments) => setItem(KEYS.COMMENTS, comments),

  getLikes: () => getItem(KEYS.LIKES, []),
  setLikes: (likes) => setItem(KEYS.LIKES, likes),

  getCurrentUser: () => getItem(KEYS.CURRENT_USER, null),
  setCurrentUser: (user) => setItem(KEYS.CURRENT_USER, user),
  clearCurrentUser: () => localStorage.removeItem(KEYS.CURRENT_USER),
}

export { generateId } from './helpers.js'