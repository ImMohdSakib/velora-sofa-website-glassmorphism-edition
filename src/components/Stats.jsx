export default function Stats(){
  const stats = [
    { k: "10K+", v: "Happy Customers" },
    { k: "20+", v: "Premium Designs" },
    { k: "15+", v: "Years Craft" },
    { k: "4.9/5", v: "Average Rating" },
  ]
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="glass-premium rounded-[28px] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.08] border border-white/12 noise-overlay overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.3)]">
          {stats.map(s => (
            <div key={s.k} className="p-6 sm:p-8 text-center group hover:bg-white/[0.03] transition-colors duration-300">
              <p className="font-serif text-3xl sm:text-4xl gold-text tracking-tight">{s.k}</p>
              <p className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/40">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
