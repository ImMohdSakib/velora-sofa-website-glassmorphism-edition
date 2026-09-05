import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('velora-user') || 'null') } catch { return null }
  })
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // login | signup

  useEffect(() => {
    if (user) localStorage.setItem('velora-user', JSON.stringify(user))
    else localStorage.removeItem('velora-user')
  }, [user])

  const signup = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('velora-users') || '[]')
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Email already registered' }
    }
    const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() }
    users.push(newUser)
    localStorage.setItem('velora-users', JSON.stringify(users))
    const { password: _, ...safe } = newUser
    setUser(safe)
    setAuthOpen(false)
    return { ok: true }
  }

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('velora-users') || '[]')
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) return { ok: false, error: 'Invalid email or password' }
    const { password: _, ...safe } = found
    setUser(safe)
    setAuthOpen(false)
    return { ok: true }
  }

  const logout = () => setUser(null)

  const openAuth = (mode = 'login') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authOpen, setAuthOpen, authMode, setAuthMode, openAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
