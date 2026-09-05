import { Link } from 'react-router-dom'

const rooms = [
  { title: 'Minimal loft', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800', tag: 'Sectional' },
  { title: 'Warm family room', img: 'https://plus.unsplash.com/premium_photo-1663100473393-9af944989598?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tag: '3 Seater' },
  { title: 'Statement living', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800', tag: 'Luxury' },
]

export default function RoomInspiration(){
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-[42px] leading-none">
            Room<br/>
            <span className="italic font-light text-white/60">inspiration</span>
          </h2>
          <Link to="/collection" className="hidden md:inline-flex text-sm text-white/50 hover:text-white transition">Explore looks →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map(r=> (
            <Link key={r.title} to="/collection" className="group relative rounded-[24px] overflow-hidden aspect-[4/5] glass">
              <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[11px] uppercase tracking-widest text-[#D4B78F]">{r.tag}</span>
                <p className="font-serif text-xl mt-1">{r.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
