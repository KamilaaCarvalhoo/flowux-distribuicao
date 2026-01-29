export default function ProductCard({ product }) {
  return (
    <div className="flex items-center gap-4 py-6 border-b border-white/10">

      {/* IMAGEM REDONDA */}
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="flex-1">
        <h2 className="text-xl font-extrabold tracking-tight">
          {product.name}
        </h2>

        <p className="text-sm text-white/70 leading-relaxed mt-1">
          {product.description}
        </p>

        {/* PREÇO */}
        <div className="mt-3 inline-block bg-red-700 px-5 py-2 rounded-full font-bold text-lg">
          R$ {product.price.toFixed(2)}
        </div>
      </div>

      {/* BOTÃO */}
      <button
        className="
          bg-green-700 hover:bg-green-600
          px-6 py-3 rounded-full
          font-semibold text-white
          transition active:scale-95
        "
      >
        Adicionar
      </button>

    </div>
  )
}
