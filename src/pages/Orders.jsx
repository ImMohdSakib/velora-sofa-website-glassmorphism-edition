import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import { Package } from 'lucide-react'

export default function Orders() {
  const { user, openAuth } = useAuth()
  const { getUserOrders } = useOrders()

  if (!user) {
    return (
      <section className="pt-32 pb-20 min-h-[60vh] text-center px-6">
        <h1 className="font-serif text-3xl">Your orders</h1>
        <p className="mt-2 text-white/50">Login to view order history and tracking.</p>
        <button onClick={() => openAuth('login')} className="mt-6 px-8 py-3 rounded-full bg-white text-[#07111F] font-medium hover:bg-[#E8D5B5] transition">
          Login
        </button>
      </section>
    )
  }

  const orders = getUserOrders(user.id)

  return (
    <section className="pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4B78F] mb-2">Account</p>
        <h1 className="font-serif text-[36px] sm:text-[42px] leading-none">My orders</h1>
        <p className="mt-2 text-white/45 text-sm">Hi {user.name} — {orders.length} order{orders.length !== 1 ? 's' : ''}</p>

        {orders.length === 0 ? (
          <div className="mt-12 text-center glass-premium rounded-[24px] p-12 border border-white/12">
            <Package size={32} className="mx-auto text-white/30 mb-4" />
            <p className="font-serif text-xl">No orders yet</p>
            <Link to="/collection" className="inline-flex mt-6 px-6 py-3 rounded-full bg-white text-[#07111F] text-sm font-medium hover:bg-[#E8D5B5] transition">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {orders.map(o => (
              <Link
                key={o.id}
                to={`/orders/${o.id}`}
                className="block glass-premium glass-hover rounded-[20px] p-5 border border-white/12 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg text-[#D4B78F]">{o.id}</p>
                    <p className="text-xs text-white/40 mt-1">
                      {new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full glass text-xs text-[#D4B78F] border border-[#D4B78F]/25">
                      {o.status}
                    </span>
                    <span className="font-medium">${o.totals.total}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
