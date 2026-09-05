import { Link } from 'react-router-dom'
import { categories } from '../data/sofas'

export default function Categories(){
  return (
    <section id="categories" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p className="section-label mb-2">Browse</p>
            <h2 className="font-serif text-[36px] sm:text-[42px] leading-none">Shop by category</h2>
          </div>
          <p className="text-sm text-white/45 max-w-[300px] hidden md:block leading-relaxed">
            Curated forms for every architecture, from compact studios to grand living rooms.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map(c => (
            <Link
              key={c.name}
              to="/collection"
              className="group rounded-[22px] glass-premium glass-hover shine-hover p-2.5 border border-white/10 noise-overlay block transition-all duration-300"
            >
              <div className="rounded-[16px] overflow-hidden aspect-[4/3] relative">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[15px]">{c.name}</p>
                  <p className="text-[12px] text-white/40">{c.count} products</p>
                </div>
                <div className="w-8 h-8 rounded-full btn-premium flex items-center justify-center text-sm">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
