import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDistributor } from "../context/DistributorContext"
import { useOrders } from "../context/OrdersContext"

export default function ClientDashboard() {
  const { distributor } = useDistributor()
  const { createOrder } = useOrders()
  const navigate = useNavigate()

  const dist = distributor

  const [cart,setCart] = useState([])
  const [address,setAddress] = useState("")

  if (!dist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando…
      </div>
    )
  }

  const products = (dist.products || []).filter(p=>p.active)

  function addProduct(p){
    setCart(prev=>{
      const item = prev.find(i=>i.id===p.id)
      if(item){
        return prev.map(i=>i.id===p.id ? {...i,qty:i.qty+1}:i)
      }
      return [...prev,{...p,qty:1}]
    })
  }

  function removeProduct(p){
    setCart(prev =>
      prev.map(i=> i.id===p.id ? {...i,qty:i.qty-1}:i)
          .filter(i=>i.qty>0)
    )
  }

  const subtotal = cart.reduce((s,p)=>s+p.price*p.qty,0)
  const delivery = dist.delivery?.enabled ? dist.delivery.fee : 0
  const total = subtotal + delivery

  function finalizar(){
    if(!cart.length) return alert("Carrinho vazio")
    if(!address) return alert("Informe endereço")

    createOrder({
      id: Date.now(),
      items: cart,
      total,
      address
    })

    setCart([])
    alert("Pedido criado (modo dev)")
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 pb-44 relative overflow-hidden">

      {/* glow background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />

      {/* HEADER */}
      <header className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-xl font-black">
            {dist.name}
          </h1>
          <p className="text-xs opacity-60">
            Catálogo digital
          </p>
        </div>

        <button
          onClick={()=>navigate("/")}
          className="px-4 py-2 rounded-xl bg-red-500 text-black font-bold hover:brightness-110 transition"
        >
          sair
        </button>
      </header>

      {/* PRODUTOS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {products.map(p=>{
          const item = cart.find(i=>i.id===p.id)

          return (
            <div
              key={p.id}
              className="group bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur hover:bg-white/10 transition shadow-xl"
            >
              <h2 className="font-bold text-lg mb-1">
                {p.name}
              </h2>

              <p className="text-sm opacity-70 mb-4">
                R$ {p.price.toFixed(2)} • {p.unit}
              </p>

              {!item ? (
                <button
                  onClick={()=>addProduct(p)}
                  className="w-full py-2 rounded-xl font-bold text-black
                  bg-gradient-to-r from-green-400 to-emerald-500
                  hover:brightness-110 active:scale-95 transition"
                >
                  adicionar
                </button>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    onClick={()=>removeProduct(p)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-black font-bold"
                  >
                    −
                  </button>

                  <span className="font-black text-lg">
                    {item.qty}
                  </span>

                  <button
                    onClick={()=>addProduct(p)}
                    className="px-3 py-1 rounded-lg bg-green-500 text-black font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ENDEREÇO */}
      <div className="mt-8 relative z-10">
        <label className="text-sm opacity-70">
          Endereço de entrega
        </label>

        <textarea
          value={address}
          onChange={e=>setAddress(e.target.value)}
          placeholder="Rua, número, bairro..."
          className="w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-pink-500 outline-none"
        />
      </div>

      {/* CARRINHO FIXO */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur border-t border-white/10 p-5 space-y-3">

          <div className="flex justify-between text-sm opacity-80">
            <span>subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>

          {delivery>0 && (
            <div className="flex justify-between text-sm opacity-80">
              <span>entrega</span>
              <span>R$ {delivery.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-lg font-black">
            <span>total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button
            onClick={finalizar}
            className="
              w-full py-3 rounded-xl font-black text-black
              bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500
              hover:brightness-110 active:scale-95 transition
              shadow-xl
            "
          >
            finalizar pedido
          </button>
        </div>
      )}
    </div>
  )
}
