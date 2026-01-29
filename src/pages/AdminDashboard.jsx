import { useState } from "react"
import { useDistributor } from "../context/DistributorContext"

export default function AdminDashboard() {
  const { distributor, setDistributor } = useDistributor()

  if (!distributor) return null

  const plan = distributor.plan?.name || "start"

  const isPro = plan === "pro" || plan === "enterprise"
  const isEnterprise = plan === "enterprise"

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  })

  function addProduct() {
    if (!newProduct.name || !newProduct.price) return

    setDistributor(prev => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: Date.now(),
          name: newProduct.name,
          price: Number(newProduct.price),
          active: true,
        },
      ],
    }))

    setNewProduct({ name: "", price: "" })
  }

  function uploadLogo(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = ev => {
      setDistributor({
        ...distributor,
        logo: ev.target.result,
      })
    }
    reader.readAsDataURL(file)
  }

  const publicLink = distributor.publicSlug
    ? `${window.location.origin}/cliente/${distributor.publicSlug}`
    : `${window.location.origin}/cliente/${distributor.id}`

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-3xl font-black mb-10">
        Painel Enterprise
      </h1>

      {/* NOME */}
      <input
        value={distributor.name}
        onChange={e =>
          setDistributor({ ...distributor, name: e.target.value })
        }
        placeholder="Nome da distribuidora"
        className="mb-6 px-4 py-3 rounded-xl bg-black/50 border border-white/10 w-full max-w-md"
      />

      {/* CORES — PRO+ */}
      {isPro && (
        <div className="grid grid-cols-3 gap-6 mb-10 max-w-lg">
          {["primary", "secondary", "accent"].map(c => (
            <input
              key={c}
              type="color"
              value={distributor.colors[c]}
              onChange={e =>
                setDistributor({
                  ...distributor,
                  colors: {
                    ...distributor.colors,
                    [c]: e.target.value,
                  },
                })
              }
              className="w-24 h-24"
            />
          ))}
        </div>
      )}

      {/* ⭐ ENTERPRISE — LOGO */}
      {isEnterprise && (
        <div className="mb-8">
          <p className="font-bold mb-2">
            Logo da distribuidora
          </p>

          <input type="file" onChange={uploadLogo} />

          {distributor.logo && (
            <img
              src={distributor.logo}
              className="w-32 mt-4 rounded-xl"
            />
          )}
        </div>
      )}

      {/* ⭐ ENTERPRISE — SLUG */}
      {isEnterprise && (
        <div className="mb-10">
          <p className="font-bold mb-2">
            Link personalizado
          </p>

          <input
            value={distributor.publicSlug || ""}
            onChange={e =>
              setDistributor({
                ...distributor,
                publicSlug: e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-"),
              })
            }
            placeholder="bebidas-do-joao"
            className="px-4 py-3 rounded-xl bg-black/50 border border-white/10"
          />
        </div>
      )}

      {/* LINK PÚBLICO */}
      <div className="mb-10">
        <p className="opacity-70 text-sm mb-2">
          Link público:
        </p>

        <div className="flex gap-2">
          <input
            value={publicLink}
            readOnly
            className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/10"
          />

          <button
            onClick={() => navigator.clipboard.writeText(publicLink)}
            className="px-6 py-3 bg-green-500 text-black rounded-xl font-bold"
          >
            Copiar
          </button>
        </div>
      </div>

      {/* PRODUTOS */}
      <div className="bg-white/5 p-6 rounded-2xl max-w-md">
        <input
          placeholder="Nome"
          value={newProduct.name}
          onChange={e =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full mb-3 px-4 py-3 rounded-xl bg-black/50 border border-white/10"
        />

        <input
          placeholder="Preço"
          type="number"
          value={newProduct.price}
          onChange={e =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="w-full mb-4 px-4 py-3 rounded-xl bg-black/50 border border-white/10"
        />

        <button
          onClick={addProduct}
          className="w-full py-3 rounded-xl font-bold text-black"
          style={{ backgroundColor: distributor.colors.primary }}
        >
          Adicionar produto
        </button>
      </div>

    </div>
  )
}
