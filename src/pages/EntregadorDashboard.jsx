import { useNavigate } from "react-router-dom"
import { useOrders } from "../context/OrdersContext"
import { useAuth } from "../context/AuthContext"

export default function EntregadorDashboard() {
  const navigate = useNavigate()
  const { orders, updateOrder } = useOrders()
  const { logout } = useAuth()

  const list = orders || []

  async function handleLogout() {
    try {
      await logout()
      navigate("/")
    } catch {
      alert("Erro ao sair")
    }
  }

  function statusColor(status) {
    if (status === "novo") return "bg-yellow-500/20 text-yellow-400"
    if (status === "aceito") return "bg-blue-500/20 text-blue-400"
    if (status === "em_entrega") return "bg-orange-500/20 text-orange-400"
    if (status === "entregue") return "bg-green-500/20 text-green-400"
    return "bg-white/10 text-white"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-6 py-8">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-extrabold">
            🚚 Painel do Entregador
          </h1>
          <p className="text-white/60 text-sm">
            Gerencie suas entregas
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl bg-red-500 text-black font-bold hover:brightness-110 transition"
        >
          Sair
        </button>
      </header>

      {/* LISTA */}
      {list.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <p className="text-lg font-semibold opacity-80">
            Nenhum pedido disponível
          </p>
          <p className="text-sm opacity-50 mt-2">
            Quando houver pedidos novos eles aparecem aqui
          </p>
        </div>
      )}

      <div className="grid gap-6 max-w-4xl">

        {list.map(order => (
          <div
            key={order.id}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur"
          >

            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold">
                  Pedido #{order.id}
                </h2>
                <p className="text-sm opacity-60">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className={`px-3 py-1 rounded-xl text-sm font-bold ${statusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* ENDEREÇO */}
            {order.address && (
              <div className="mb-4 bg-black/40 rounded-xl p-3">
                <p className="text-xs opacity-60 mb-1">📍 Endereço</p>
                <p className="font-medium">{order.address}</p>
              </div>
            )}

            {/* ITENS */}
            <div className="mb-4 space-y-1">
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm opacity-80">
                  <span>
                    {item.name} — {item.qty} {item.unit}
                  </span>
                  <span>
                    R$ {(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-extrabold text-lg mb-4">
              <span>Total</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </div>

            {/* AÇÕES */}
            <div className="flex gap-3 flex-wrap">

              {order.status === "novo" && (
                <button
                  onClick={() =>
                    updateOrder(order.id, {
                      status: "aceito",
                      entregadorId: "local",
                    })
                  }
                  className="px-5 py-2 rounded-xl bg-blue-500 text-black font-bold hover:brightness-110"
                >
                  Aceitar pedido
                </button>
              )}

              {order.status === "aceito" && (
                <button
                  onClick={() =>
                    updateOrder(order.id, { status: "em_entrega" })
                  }
                  className="px-5 py-2 rounded-xl bg-orange-500 text-black font-bold hover:brightness-110"
                >
                  Saiu para entrega
                </button>
              )}

              {order.status === "em_entrega" && (
                <button
                  onClick={() =>
                    updateOrder(order.id, { status: "entregue" })
                  }
                  className="px-5 py-2 rounded-xl bg-green-500 text-black font-bold hover:brightness-110"
                >
                  Marcar entregue
                </button>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
