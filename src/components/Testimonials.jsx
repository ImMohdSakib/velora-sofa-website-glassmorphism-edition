import { testimonials } from '../data/sofas'
import { Star } from 'lucide-react'

export default function Testimonials(){
  return (
    <section id="reviews" className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <p className="section-label mb-3">Reviews</p>
        <h2 className="font-serif text-[36px] sm:text-[42px] leading-none">Loved in real homes</h2>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="glass-premium glass-hover rounded-[22px] p-6 border border-white/10 noise-overlay"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass-strong flex items-center justify-center text-sm border border-white/10 text-[#D4B78F]">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[11px] text-white/40">{t.sofa}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  <Star size={11} className="fill-[#D4B78F] text-[#D4B78F]" />
                  <span className="text-[12px] text-[#D4B78F]">{t.rating}.0</span>
                </div>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-white/55">"{t.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
