import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const letters = ['V', 'E', 'L', 'O', 'R', 'A']

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)
  const [phase, setPhase] = useState(0) // 0 logo, 1 text, 2 bar

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const start = Date.now()
    const duration = 2600
    let raf
    const tick = () => {
      const elapsed = Date.now() - start
      // ease-out curve
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased * 100)
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setShow(false)
          setTimeout(() => onDone?.(), 600)
        }, 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#060d18]"
        >
          {/* Animated ambient orbs */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute top-[15%] left-[10%] w-[480px] h-[480px] rounded-full blur-[130px] bg-[rgba(212,183,143,0.25)]"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="pointer-events-none absolute bottom-[10%] right-[8%] w-[420px] h-[420px] rounded-full blur-[120px] bg-[rgba(100,140,255,0.18)]"
          />

          <div className="relative flex flex-col items-center px-6">
            {/* Pulsing rings behind logo */}
            <div className="relative mb-8">
              <motion.div
                animate={{ scale: [1, 1.45], opacity: [0.35, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 -m-4 rounded-full border border-[#D4B78F]/40"
              />
              <motion.div
                animate={{ scale: [1, 1.7], opacity: [0.25, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                className="absolute inset-0 -m-4 rounded-full border border-[#D4B78F]/25"
              />
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.05 }}
                className="relative w-[72px] h-[72px] rounded-full gold-gradient flex items-center justify-center font-serif font-bold text-3xl text-[#07111F] shadow-[0_0_50px_rgba(212,183,143,0.45)]"
              >
               <motion.img
                  src="/Logo.png"
                  alt="VELORA Logo"
                  className="w-16 h-16 object-contain"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Staggered brand letters */}
            <div className="flex items-center gap-[0.12em] overflow-hidden">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-3xl sm:text-4xl tracking-[0.28em] font-semibold text-white"
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-4 text-[11px] uppercase tracking-[0.28em] text-white/40"
            >
              Luxury seating for modern living
            </motion.p>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="mt-14 w-52 flex flex-col items-center"
            >
              <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full gold-gradient relative"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="text-[10px] uppercase tracking-[0.2em] text-white/35"
                >
                  Loading
                </motion.span>
                <span className="text-[11px] text-white/30 tabular-nums w-8 text-right">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
