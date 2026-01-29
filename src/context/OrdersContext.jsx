import { createContext, useContext, useState } from "react"

const OrdersContext = createContext()

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([])

  function createOrder(order) {
    setOrders(prev => [...prev, order])
  }

  function acceptOrder(id, entregadorId) {
    setOrders(prev =>
      prev.map(o =>
        o.id === id && !o.entregadorId
          ? { ...o, status: "aceito", entregadorId }
          : o
      )
    )
  }

  function updateOrder(id, data) {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, ...data } : o))
    )
  }

  return (
    <OrdersContext.Provider
      value={{ orders, createOrder, acceptOrder, updateOrder }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => useContext(OrdersContext)
