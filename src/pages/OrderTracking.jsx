import { useParams, Link } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import { Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react'

export default function OrderTracking() {
  const { id } = useParams()
  const { getOrder, advanceStatus, STATUSES } = useOrders()
  const { user, openAuth } = useAuth()
  const order = getOrder(id)

  if (!order) {
    return (
      <section className="pt-32 pb-20 min-h-[60vh] text-center px-6">
        <h1 className="font-serif text-3xl">Order not found</h1>
        <p className="mt-2 text-white/50">Check your order ID or login to view orders.</p>
        <Link to="/orders" className="inline-flex mt-6 px-6 py-3 rounded-full glass text-sm hover:bg-white/10">My orders</Link>
      </section>
    )
  }

  const steps = STATUSES
  const current = order.statusIndex

  return (
    <section className="pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4B78F] mb-2">Tracking</p>
        <h1 className="font-serif text-[36px] sm:text-[42px] leading-none">Order {order.id}</h1>
        <p className="mt-3 text-white/50 text-sm">
          Placed {new Date(order.createdAt).toLocaleString()} · Status: <span className="text-[#D4B78F]">{order.status}</span>
        </p>

        {/* Timeline */}
        <div className="mt-10 glass-premium rounded-[24px] p-6 sm:p-8 border border-white/12">
          <h3 className="font-serif text-xl mb-8">Progress</h3>
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-6">
              {steps.map((s, i) => {
                const done = i <= current
                const active = i === current
                return (
                  <div key={s} className="flex gap-4 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border ${
                      done
                        ? 'bg-[#D4B78F] border-[#D4B78F] text-[#07111F]'
                        : 'glass border-white/15 text-white/30'
                    }`}>
                      {done ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-medium ${done ? 'text-white' : 'text-white/35'}`}>{s}</p>
                      {order.timeline.find(t => t.status === s) && (
                        <p className="text-xs text-white/40 mt-0.5">
                          {new Date(order.timeline.find(t => t.status === s).at).toLocaleString()}
                        </p>
                      )}
                    </div>
                    {active && i < steps.length - 1 && (
                      <button
                        type="button"
                        onClick={() => advanceStatus(order.id)}
                        className="ml-auto text-[11px] px-3 py-1.5 rounded-full glass text-[#D4B78F] hover:bg-white/10 self-start"
                      >
                        Demo: next status
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="glass-premium rounded-[24px] p-6 border border-white/12">
            <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
              <Package size={16} className="text-[#D4B78F]" /> Items
            </h3>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-white/45">Qty {item.qty} · ${item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-sm">
              <span className="text-white/50">Total</span>
              <span className="font-semibold">${order.totals.total}</span>
            </div>
          </div>

          <div className="glass-premium rounded-[24px] p-6 border border-white/12">
            <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-[#D4B78F]" /> Shipping
            </h3>
            <p className="text-sm font-medium">{order.shipping.fullName}</p>
            <p className="text-sm text-white/55 mt-1 leading-relaxed">
              {order.shipping.address}<br />
              {order.shipping.city}, {order.shipping.state} {order.shipping.zip}<br />
              {order.shipping.country}
            </p>
            <p className="text-sm text-white/45 mt-3">{order.shipping.phone}</p>
            <p className="text-sm text-white/45">{order.shipping.email}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
              <Truck size={14} className="text-[#D4B78F]" />
              Est. delivery {new Date(order.estimatedDelivery).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link to="/orders" className="px-6 py-3 rounded-full glass text-sm hover:bg-white/10 transition">All orders</Link>
          <Link to="/collection" className="px-6 py-3 rounded-full bg-white text-[#07111F] text-sm font-medium hover:bg-[#E8D5B5] transition">Shop more</Link>
        </div>
      </div>
    </section>
  )
}
