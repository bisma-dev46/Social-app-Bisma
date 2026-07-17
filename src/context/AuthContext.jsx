import { createContext, useState } from 'react'
import { storage, generateId } from '../utils/storage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser())

  function signup({ name, email, password }) {
    const users = storage.getUsers()
    const alreadyExists = users.some((u) => u.email === email)
    if (alreadyExists) {
      throw new Error('Email already registered')
    }

    const newUser = {
      id: generateId('usr'),
      name,
      email,
      password,
      bio: '',
      location: '',
      avatar: null,
      coverImage: null,
      joinedAt: new Date().toISOString(),
    }

    storage.setUsers([...users, newUser])
    return newUser
  }

  function login(email, password) {
    const users = storage.getUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      throw new Error('Invalid email or password')
    }

    const { password: _password, ...safeUser } = found
    setCurrentUser(safeUser)
    storage.setCurrentUser(safeUser)
    return safeUser
  }

  function logout() {
    setCurrentUser(null)
    storage.clearCurrentUser()
  }

  function updateCurrentUser(updatedData) {
    if (!currentUser) return

    const updatedUser = { ...currentUser, ...updatedData }

    setCurrentUser(updatedUser)
    storage.setCurrentUser(updatedUser)
    const users = storage.getUsers()
    const nextUsers = users.map((u) =>
      u.id === updatedUser.id ? { ...u, ...updatedData } : u
    )
    storage.setUsers(nextUsers)
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    updateCurrentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}