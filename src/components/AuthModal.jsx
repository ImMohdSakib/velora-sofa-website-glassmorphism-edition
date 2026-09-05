import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal() {
  const { authOpen, setAuthOpen, authMode, setAuthMode, login, signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Lock body scroll when modal open
  useEffect(() => {
    if (authOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [authOpen])

  const reset = () => { setName(''); setEmail(''); setPassword(''); setError('') }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const res = authMode === 'login'
      ? login({ email, password })
      : signup({ name, email, password })
    setLoading(false)
    if (!res.ok) setError(res.error)
    else reset()
  }

  const switchMode = (mode) => {
    setAuthMode(mode)
    setError('')
  }

  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ minHeight: '100dvh' }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthOpen(false)}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Centered modal — flex parent handles center, no transform conflict */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-md max-h-[min(90dvh,640px)] overflow-y-auto glass-premium rounded-[28px] p-6 sm:p-7 border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4B78F]">Account</p>
                <h2 className="font-serif text-2xl mt-1">
                  {authMode === 'login' ? 'Welcome back' : 'Create account'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAuthOpen(false)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex gap-2 p-1 rounded-full glass mb-6">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`flex-1 py-2 rounded-full text-sm transition ${
                  authMode === 'login' ? 'bg-white text-[#07111F] font-medium' : 'text-white/60'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 rounded-full text-sm transition ${
                  authMode === 'signup' ? 'bg-white text-[#07111F] font-medium' : 'text-white/60'
                }`}
              >
                Sign up
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {authMode === 'signup' && (
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass bg-white/5 text-sm placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-[#D4B78F]/40 border border-white/10"
                  />
                </div>
              )}
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass bg-white/5 text-sm placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-[#D4B78F]/40 border border-white/10"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password (min 6)"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass bg-white/5 text-sm placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-[#D4B78F]/40 border border-white/10"
                />
              </div>

              {error && (
                <p className="text-sm text-red-300/90 bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-white text-[#07111F] font-medium hover:bg-[#E8D5B5] transition disabled:opacity-60"
              >
                {loading ? 'Please wait…' : authMode === 'login' ? 'Login' : 'Create account'}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-white/40">
              {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => switchMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-[#D4B78F] hover:underline"
              >
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
