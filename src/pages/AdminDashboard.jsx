import { useState, useMemo } from "react"
import { useDistributor } from "../context/DistributorContext"
import { useOrders } from "../context/OrdersContext"

export default function AdminDashboard() {
  const { distributor, setDistributor, hasFeature } = useDistributor()
  const { orders } = useOrders()
  const [tab, setTab] = useState("config")

  if (!distributor) {
    return <Screen msg="Carregando painel…" />
  }

  const products = distributor.products || []
  const colors = distributor.colors
  const delivery = distributor.delivery

  const kpis = useMemo(() => {
    const total = orders.reduce((s,o)=>s+o.total,0)
    return {
      pedidos: orders.length,
      faturamento: total,
      ticket: orders.length ? total/orders.length : 0
    }
  }, [orders])

  const [newProduct,setNewProduct] = useState({
    name:"",
    price:"",
    unit:"un"
  })

  function addProduct(){
    if(!newProduct.name || !newProduct.price) return
    setDistributor(prev=>({
      ...prev,
      products:[
        ...prev.products,
        { id:Date.now(), ...newProduct, price:Number(newProduct.price), active:true }
      ]
    }))
    setNewProduct({name:"",price:"",unit:"un"})
  }

  function deleteProduct(id){
    setDistributor(prev=>({
      ...prev,
      products: prev.products.filter(p=>p.id!==id)
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">

      {/* HEADER PREMIUM */}
      <div className="rounded-3xl p-8 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-white/10 backdrop-blur-xl">
        <h1 className="text-4xl font-black tracking-tight">
          {distributor.name || "Distribuidora"}
        </h1>
        <p className="opacity-60 mt-1">
          Painel Administrativo • Plano {distributor.plan?.toUpperCase()}
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3">
        {["config","produtos","financeiro"].map(t=>(
          <button
            key={t}
            onClick={()=>setTab(t)}
            className={`
              px-6 py-3 rounded-2xl font-bold transition
              ${tab===t
                ? "bg-white text-black shadow-lg"
                : "bg-white/10 hover:bg-white/20"}
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================= CONFIG ================= */}
      {tab==="config" && (
        <Card title="Identidade & Entrega">

          <Input
            placeholder="Nome da distribuidora"
            value={distributor.name}
            onChange={v=>setDistributor({...distributor,name:v})}
          />

          <Input
            placeholder="WhatsApp"
            value={distributor.whatsapp}
            onChange={v=>setDistributor({...distributor,whatsapp:v})}
          />

          <Input
            placeholder="Mensagem do pedido"
            value={distributor.orderMessage}
            onChange={v=>setDistributor({...distributor,orderMessage:v})}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={delivery.enabled}
              onChange={e=>setDistributor({
                ...distributor,
                delivery:{...delivery,enabled:e.target.checked}
              })}
            />
            Entrega ativa
          </div>

          {delivery.enabled && (
            <Input
              placeholder="Taxa de entrega"
              type="number"
              value={delivery.fee}
              onChange={v=>setDistributor({
                ...distributor,
                delivery:{...delivery,fee:Number(v)}
              })}
            />
          )}

          {/* CORES ENTERPRISE */}
          {hasFeature("branding") && (
            <div>
              <p className="font-bold mb-4">Cores Enterprise</p>
              <div className="flex gap-6">
                {Object.entries(colors).map(([k,v])=>(
                  <input
                    key={k}
                    type="color"
                    value={v}
                    onChange={e=>setDistributor({
                      ...distributor,
                      colors:{...colors,[k]:e.target.value}
                    })}
                    className="w-16 h-16 rounded-xl cursor-pointer shadow-xl"
                  />
                ))}
              </div>
            </div>
          )}

        </Card>
      )}

      {/* ================= PRODUTOS ================= */}
      {tab==="produtos" && (
        <Card title="Produtos do Catálogo">

          <div className="grid md:grid-cols-4 gap-3">
            <Input placeholder="Nome"
              value={newProduct.name}
              onChange={v=>setNewProduct({...newProduct,name:v})}
            />
            <Input placeholder="Preço" type="number"
              value={newProduct.price}
              onChange={v=>setNewProduct({...newProduct,price:v})}
            />
            <Input placeholder="Unidade"
              value={newProduct.unit}
              onChange={v=>setNewProduct({...newProduct,unit:v})}
            />

            <button onClick={addProduct} className="btnPrimary">
              + Produto
            </button>
          </div>

          <div className="space-y-3 mt-6">
            {products.map(p=>(
              <div key={p.id} className="row">
                <b>{p.name}</b>
                <span>R$ {p.price}</span>
                <span>{p.unit}</span>
                <button onClick={()=>deleteProduct(p.id)}>
                  excluir
                </button>
              </div>
            ))}
          </div>

        </Card>
      )}

      {/* ================= FINANCEIRO ================= */}
      {tab==="financeiro" && hasFeature("finance") && (
        <div className="grid md:grid-cols-3 gap-6">

          <Metric title="Pedidos" value={kpis.pedidos} />
          <Metric title="Faturamento" value={`R$ ${kpis.faturamento.toFixed(2)}`} />
          <Metric title="Ticket médio" value={`R$ ${kpis.ticket.toFixed(2)}`} />

        </div>
      )}

      <style>{`
        .btnPrimary{
          background:linear-gradient(90deg,#ff6b00,#ff00aa,#00c3ff);
          border-radius:16px;
          font-weight:800;
          color:black;
        }
        .row{
          display:grid;
          grid-template-columns:1fr auto auto auto;
          gap:12px;
          padding:14px;
          border-radius:16px;
          background:rgba(255,255,255,.05);
        }
      `}</style>

    </div>
  )
}

/* COMPONENTES UI */

function Card({title,children}){
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-5 backdrop-blur-xl shadow-xl">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </div>
  )
}

function Input({value,onChange, ...rest}){
  return (
    <input
      value={value}
      onChange={e=>onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:ring-2 focus:ring-purple-500 outline-none"
      {...rest}
    />
  )
}

function Metric({title,value}){
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 backdrop-blur-xl">
      <p className="opacity-60 text-sm">{title}</p>
      <p className="text-3xl font-black mt-2">{value}</p>
    </div>
  )
}

function Screen({msg}){
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {msg}
    </div>
  )
}
