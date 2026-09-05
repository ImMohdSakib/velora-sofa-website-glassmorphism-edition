import { createContext, useContext, useEffect, useState } from 'react'

const OrderContext = createContext()

const STATUSES = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Out for delivery', 'Delivered']

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('velora-orders') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('velora-orders', JSON.stringify(orders))
  }, [orders])

  const placeOrder = ({ userId, items, shipping, totals }) => {
    const id = `VL${Date.now().toString().slice(-8)}`
    const order = {
      id,
      userId,
      items,
      shipping,
      totals,
      status: 'Placed',
      statusIndex: 0,
      timeline: [
        { status: 'Placed', at: new Date().toISOString(), note: 'Order received' }
      ],
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 86400000).toISOString(),
    }
    setOrders(prev => [order, ...prev])
    return order
  }

  const getOrder = (id) => orders.find(o => o.id === id)
  const getUserOrders = (userId) => orders.filter(o => o.userId === userId)

  // Demo: advance status for tracking feel (optional, called from tracking page simulate)
  const advanceStatus = (id) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id || o.statusIndex >= STATUSES.length - 1) return o
      const next = o.statusIndex + 1
      return {
        ...o,
        statusIndex: next,
        status: STATUSES[next],
        timeline: [
          ...o.timeline,
          { status: STATUSES[next], at: new Date().toISOString(), note: `Status updated to ${STATUSES[next]}` }
        ]
      }
    }))
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder, getUserOrders, advanceStatus, STATUSES }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => useContext(OrderContext)
