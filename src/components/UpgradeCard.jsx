export default function UpgradeCard({ plan }) {

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 text-black">

      <h3 className="font-black text-xl mb-2">
        Recurso Premium
      </h3>

      <p className="mb-4">
        Disponível no plano {plan.toUpperCase()}
      </p>

      <button className="px-6 py-2 bg-black text-white rounded-xl font-bold">
        Fazer upgrade
      </button>

    </div>
  )

}
