import { useDistributor } from "../context/DistributorContext"
import { useNavigate } from "react-router-dom"

export default function Plans() {
  const { distributor, setDistributor } = useDistributor()
  const navigate = useNavigate()

  function selectPlan(planName) {
    setDistributor({
      ...distributor,
      plan: {
        name: planName,
        status: "active",
      },
    })

    navigate("/admin")
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 max-w-xl mx-auto grid gap-6">

      <h1 className="text-3xl font-black text-center">
        Escolha seu plano
      </h1>

      <button
        onClick={() => selectPlan("start")}
        className="p-6 rounded-2xl bg-white/10 hover:bg-white/20"
      >
        <strong>Start</strong><br />
        Até 20 produtos
      </button>

      <button
        onClick={() => selectPlan("pro")}
        className="p-6 rounded-2xl bg-orange-500 text-black font-bold"
      >
        Pro<br />
        Financeiro + cores
      </button>

      <button
        onClick={() => selectPlan("enterprise")}
        className="p-6 rounded-2xl bg-blue-500 text-black font-bold"
      >
        Enterprise<br />
        Tudo liberado
      </button>

    </div>
  )
}
