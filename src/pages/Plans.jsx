import { useNavigate } from "react-router-dom"
import { useDistributor } from "../context/DistributorContext"

export default function Plans() {
  const navigate = useNavigate()
  const { setDistributor } = useDistributor()

  function escolherPlano(plano) {
    setDistributor(prev => ({
      ...prev,
      plan: plano,
    }))
    navigate("/admin")
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND FX */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-600/30 blur-3xl rounded-full animate-pulse"/>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-600/30 blur-3xl rounded-full animate-pulse"/>

      <div className="relative max-w-6xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Planos FlowUX
          </h1>
          <p className="opacity-70 text-lg">
            Escolha o nível da sua distribuidora 🚀
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* ================= START ================= */}
          <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition-all">

            <h2 className="text-2xl font-bold mb-2">Start</h2>

            <p className="text-5xl font-black mb-6">
              R$49
              <span className="text-base opacity-60">/mês</span>
            </p>

            <ul className="space-y-3 text-sm opacity-80 mb-8">
              <li>✓ Até 20 produtos</li>
              <li>✓ Catálogo público</li>
              <li>✓ Pedidos online</li>
              <li>✓ Link para clientes</li>
              <li>✓ Tema claro/escuro</li>
            </ul>

            <button
              onClick={() => escolherPlano("start")}
              className="w-full py-4 rounded-xl bg-white text-black font-extrabold hover:brightness-110 active:scale-95 transition"
            >
              Começar Start
            </button>
          </div>

          {/* ================= PRO ================= */}
          <div className="relative group rounded-3xl p-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 scale-105 shadow-2xl">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 bg-yellow-400 text-black text-xs font-black rounded-full">
              MAIS ESCOLHIDO
            </div>

            <div className="bg-black rounded-3xl p-8 h-full">

              <h2 className="text-2xl font-bold mb-2">Pro</h2>

              <p className="text-5xl font-black mb-2">
                R$99
                <span className="text-base opacity-60">/mês</span>
              </p>

              <p className="text-xs text-green-400 mb-6">
                Melhor custo benefício
              </p>

              <ul className="space-y-3 text-sm opacity-90 mb-8">
                <li>✓ Produtos ilimitados</li>
                <li>✓ Entrega + taxa</li>
                <li>✓ WhatsApp automático</li>
                <li>✓ Painel completo</li>
                <li>✓ Histórico pedidos</li>
                <li>✓ Personalização</li>
              </ul>

              <button
                onClick={() => escolherPlano("pro")}
                className="w-full py-4 rounded-xl bg-yellow-400 text-black font-extrabold hover:brightness-110 active:scale-95 transition shadow-xl"
              >
                Escolher Pro
              </button>

            </div>
          </div>

          {/* ================= ENTERPRISE ================= */}
          <div className="group relative bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-rose-600/30 border border-white/20 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-xl">

            <div className="mb-3 inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-bold">
              ENTERPRISE
            </div>

            <h2 className="text-2xl font-bold mb-2">
              Enterprise
            </h2>

            <p className="text-5xl font-black mb-2">
              R$1.910
            </p>

            <p className="text-sm opacity-70 mb-6">
              anual • economia real
            </p>

            <ul className="space-y-3 text-sm opacity-95 mb-8">
              <li>✓ Tudo do Pro</li>
              <li>✓ Cores livres</li>
              <li>✓ Financeiro completo</li>
              <li>✓ Relatórios</li>
              <li>✓ Módulos premium</li>
              <li>✓ Marca personalizada</li>
              <li>✓ Recursos exclusivos</li>
            </ul>

            <button
              onClick={() => escolherPlano("enterprise")}
              className="w-full py-4 rounded-xl bg-pink-500 text-black font-extrabold hover:brightness-110 active:scale-95 transition"
            >
              Virar Enterprise
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
