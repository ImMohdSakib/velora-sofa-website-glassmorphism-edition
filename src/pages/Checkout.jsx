import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { MapPin, User, Phone, Mail, CreditCard, Check } from 'lucide-react'

export default function Checkout() {
  const { cart, subtotal, shipping, total, clearCart } = useCart()
  const { user, openAuth } = useAuth()
  const { placeOrder } = useOrders()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
    notes: '',
    payment: 'cod',
  })
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [done, setDone] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!form.zip.trim()) e.zip = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!cart.length) return
    if (!user) {
      openAuth('login')
      return
    }
    if (!validate()) return
    setPlacing(true)
    await new Promise(r => setTimeout(r, 800))
    const order = placeOrder({
      userId: user.id,
      items: cart.map(i => ({
        id: i.id, name: i.name, price: i.price, qty: i.qty, image: i.image
      })),
      shipping: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
        notes: form.notes,
      },
      totals: { subtotal, shipping, total, payment: form.payment },
    })
    // clear cart
    clearCart()
    setPlacing(false)
    setDone(order)
  }

  if (!cart.length && !done) {
    return (
      <section className="pt-32 pb-20 min-h-[70vh]">
        <div className="mx-auto max-w-[640px] px-6 text-center">
          <h1 className="font-serif text-4xl">Your cart is empty</h1>
          <p className="mt-3 text-white/50">Add sofas before checkout.</p>
          <Link to="/collection" className="inline-flex mt-8 px-8 py-3.5 rounded-full bg-white text-[#07111F] font-medium hover:bg-[#E8D5B5] transition">
            Browse collection
          </Link>
        </div>
      </section>
    )
  }

  if (done) {
    return (
      <section className="pt-32 pb-20 min-h-[70vh]">
        <div className="mx-auto max-w-[560px] px-6 text-center">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-[#07111F]" />
          </div>
          <h1 className="font-serif text-4xl">Order placed</h1>
          <p className="mt-3 text-white/50">Thank you, {done.shipping.fullName}. Your order is confirmed.</p>
          <div className="mt-8 glass-premium rounded-2xl p-6 text-left">
            <p className="text-[11px] uppercase tracking-widest text-white/40">Order ID</p>
            <p className="font-serif text-2xl text-[#D4B78F] mt-1">{done.id}</p>
            <p className="text-sm text-white/50 mt-3">Total paid: <span className="text-white font-medium">${done.totals.total}</span></p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/orders/${done.id}`}
              className="px-8 py-3.5 rounded-full bg-white text-[#07111F] font-medium hover:bg-[#E8D5B5] transition"
            >
              Track order
            </Link>
            <Link to="/collection" className="px-8 py-3.5 rounded-full glass text-sm font-medium hover:bg-white/10 transition">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const field = (key, label, icon, props = {}) => (
    <div>
      <label className="text-[11px] uppercase tracking-widest text-white/40 mb-1.5 block">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35">{icon}</span>}
        <input
          value={form[key]}
          onChange={e => set(key, e.target.value)}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-2xl glass bg-white/5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#D4B78F]/40 border ${
            errors[key] ? 'border-red-400/40' : 'border-white/10'
          }`}
          {...props}
        />
      </div>
      {errors[key] && <p className="text-xs text-red-300 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <section className="pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4B78F] mb-2">Checkout</p>
        <h1 className="font-serif text-[36px] sm:text-[42px] leading-none">Complete your order</h1>

        {!user && (
          <div className="mt-6 glass rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#D4B78F]/20">
            <p className="text-sm text-white/70">Login to place and track your order.</p>
            <button onClick={() => openAuth('login')} className="px-5 py-2.5 rounded-full bg-white text-[#07111F] text-sm font-medium hover:bg-[#E8D5B5] transition shrink-0">
              Login / Sign up
            </button>
          </div>
        )}

        <form onSubmit={submit} className="mt-10 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-6">
            <div className="glass-premium rounded-[24px] p-6 border border-white/12">
              <h3 className="font-serif text-xl mb-5 flex items-center gap-2">
                <User size={18} className="text-[#D4B78F]" /> Contact
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {field('fullName', 'Full name', <User size={15} />)}
                {field('email', 'Email', <Mail size={15} />, { type: 'email' })}
                {field('phone', 'Phone', <Phone size={15} />, { type: 'tel' })}
              </div>
            </div>

            <div className="glass-premium rounded-[24px] p-6 border border-white/12">
              <h3 className="font-serif text-xl mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-[#D4B78F]" /> Shipping address
              </h3>
              <div className="space-y-4">
                {field('address', 'Street address', <MapPin size={15} />)}
                <div className="grid sm:grid-cols-2 gap-4">
                  {field('city', 'City')}
                  {field('state', 'State')}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field('zip', 'PIN / ZIP')}
                  {field('country', 'Country')}
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/40 mb-1.5 block">Order notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    rows={3}
                    placeholder="Delivery instructions…"
                    className="w-full px-4 py-3 rounded-2xl glass bg-white/5 text-sm placeholder:text-white/30 focus:outline-none border border-white/10 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="glass-premium rounded-[24px] p-6 border border-white/12">
              <h3 className="font-serif text-xl mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-[#D4B78F]" /> Payment
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'Cash on delivery', desc: 'Pay when your sofa arrives' },
                  { id: 'card', label: 'Card (demo)', desc: 'Secure card payment — demo only' },
                  { id: 'upi', label: 'UPI (demo)', desc: 'Instant UPI — demo only' },
                ].map(p => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      form.payment === p.id ? 'border-[#D4B78F]/50 bg-white/5' : 'border-white/10 glass'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.payment === p.id}
                      onChange={() => set('payment', p.id)}
                      className="mt-1 accent-[#D4B78F]"
                    />
                    <div>
                      <p className="text-sm font-medium">{p.label}</p>
                      <p className="text-xs text-white/45 mt-0.5">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28">
            <div className="glass-premium rounded-[24px] p-6 border border-white/12">
              <h3 className="font-serif text-xl mb-5">Order summary</h3>
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-white/45">Qty {item.qty}</p>
                      <p className="text-sm text-[#D4B78F] mt-0.5">${item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-5 pt-5 space-y-2 text-sm">
                <div className="flex justify-between text-white/55"><span>Subtotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between text-white/55"><span>Shipping</span><span>${shipping}</span></div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span><span>${total}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={placing}
                className="mt-6 w-full py-4 rounded-full bg-white text-[#07111F] font-medium hover:bg-[#E8D5B5] transition disabled:opacity-60"
              >
                {placing ? 'Placing order…' : 'Place order'}
              </button>
              <p className="text-[11px] text-center text-white/35 mt-3">Secure checkout · 5-year warranty</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
