import { useState } from 'react'

export default function Newsletter(){
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="glass-premium rounded-[28px] p-8 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/12 noise-overlay shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden">
          {/* soft gold glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] bg-[rgba(212,183,143,0.12)]" />

          <div className="relative">
            <p className="section-label mb-2">Newsletter</p>
            <h3 className="font-serif text-[28px] sm:text-[34px] leading-tight">Bring comfort home.</h3>
            <p className="mt-3 text-sm text-white/50 max-w-[380px] leading-relaxed">
              Get early access to new collections, exclusive offers and interior inspiration.
            </p>
          </div>

          <div className="w-full md:w-[420px] relative">
            <div className="flex gap-2 sm:gap-3">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 min-w-0 px-5 py-3.5 rounded-full glass-strong bg-white/[0.04] text-sm placeholder:text-white/35 focus:outline-none border border-white/12 focus:border-[#D4B78F]/40"
              />
              <button
                onClick={() => { if (email.includes('@')) setOk(true) }}
                className="shrink-0 px-5 sm:px-6 py-3.5 rounded-full btn-premium text-sm font-medium"
              >
                Join
              </button>
            </div>
            {ok && <p className="text-xs text-[#D4B78F] mt-3">Thank you — you're on the list.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
