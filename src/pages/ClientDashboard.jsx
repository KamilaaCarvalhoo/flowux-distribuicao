import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import { useOrders } from "../context/OrdersContext"

export default function ClientDashboard() {
  const { distributorId } = useParams()
  const { createOrder } = useOrders()

  const [distributor, setDistributor] = useState(null)
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState("")

  useEffect(() => {
    const ref = doc(db, "distributors", distributorId)
    return onSnapshot(ref, snap => {
      if (snap.exists()) {
        setDistributor({ id: snap.id, ...snap.data() })
      }
    })
  }, [distributorId])

  if (!distributor) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando catálogo…
      </div>
    )
  }

  const products = (distributor.products || []).filter(p => p.active)

  function addProduct(p) {
    setCart(prev => {
      const item = prev.find(i => i.id === p.id)
      if (item) {
        return prev.map(i =>
          i.id === p.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...p, qty: 1 }]
    })
  }

  const total = cart.reduce((s, p) => s + p.price * p.qty, 0)

  function finalizarPedido() {
    if (!address) return alert("Informe o endereço")

    createOrder({
      id: Date.now(),
      distributorId,
      items: cart,
      total,
      address,
      status: "novo",
    })

    setCart([])
    setAddress("")
    alert("Pedido enviado!")
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-40">
      <h1 className="text-xl font-bold mb-6">
        {distributor.name}
      </h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white/10 p-4 rounded-xl">
            <h2 className="font-bold">{p.name}</h2>
            <p className="opacity-70">
              R$ {p.price.toFixed(2)} / {p.unit}
            </p>

            <button
              onClick={() => addProduct(p)}
              className="mt-3 px-4 py-2 rounded-xl font-bold text-black"
              style={{ backgroundColor: distributor.colors.primary }}
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>

      <textarea
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Endereço de entrega"
        className="w-full mt-6 px-4 py-3 bg-black/60 rounded-xl"
      />

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t border-white/10">
          <p className="font-bold mb-2">
            Total: R$ {total.toFixed(2)}
          </p>
          <button
            onClick={finalizarPedido}
            className="w-full py-3 bg-green-500 text-black rounded-xl font-bold"
          >
            Finalizar pedido
          </button>
        </div>
      )}
    </div>
  )
}
