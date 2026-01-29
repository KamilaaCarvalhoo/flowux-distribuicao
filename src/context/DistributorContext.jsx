import { createContext, useContext, useEffect, useState } from "react"

/*
🔥 MODO DEV
true = não usa Firestore ainda
não trava app
*/
const DEV_MODE = true

/* ================= DEFAULT ================= */

const DEFAULT_DISTRIBUTOR = {
  id: "demo",

  /* ================= IDENTIDADE ================= */

  name: "Flow UX Distribuição",
  whatsapp: "",
  orderMessage: "Olá! Segue meu pedido:",

  theme: "dark",

  /* ================= PLANOS ================= */

  plan: {
    name: "enterprise", // start | pro | enterprise
    status: "active",
  },

  /* ================= ENTERPRISE ================= */

  logo: "",
  publicSlug: "",

  /* ================= CORES ================= */

  colors: {
    primary: "#f97316",
    secondary: "#ec4899",
    accent: "#3b82f6",
  },

  /* ================= ENTREGA ================= */

  delivery: {
    enabled: true,
    fee: 0,
    minOrder: 0,         // valor mínimo pedido
    radiusKm: 10,        // raio entrega (enterprise pode editar)
  },

  /* ================= PRODUTOS ================= */

  categories: {
    geral: true,
  },

  products: [],

  /* ================= UNIDADES ================= */

  unitsAvailable: [
    "un",
    "cx",
    "fardo",
    "kg",
    "g",
    "litro",
    "ml",
  ],
}

const DistributorContext = createContext()

export function DistributorProvider({ children }) {
  const [distributor, setDistributor] = useState(DEFAULT_DISTRIBUTOR)
  const [loading, setLoading] = useState(false)

  /* ================= LOAD ================= */

  useEffect(() => {
    if (DEV_MODE) {
      setDistributor(DEFAULT_DISTRIBUTOR)
      setLoading(false)
      return
    }

    // 🔥 aqui depois entra Firestore real
    setDistributor(DEFAULT_DISTRIBUTOR)
    setLoading(false)
  }, [])

  /* ================= SAFE UPDATE ================= */

  function updateDistributor(updates) {
    setDistributor(prev => ({
      ...prev,
      ...updates,
    }))
  }

  /* ================= CORES ================= */

  function updateColor(key, value) {
    setDistributor(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }))
  }

  /* ================= ENTREGA ================= */

  function updateDelivery(field, value) {
    setDistributor(prev => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [field]: value,
      },
    }))
  }

  /* ================= PRODUTOS ================= */

  function addProduct(product) {
    setDistributor(prev => ({
      ...prev,
      products: [
        ...(prev.products || []),
        {
          id: Date.now(),
          name: product.name || "",
          price: Number(product.price) || 0,
          category: product.category || "geral",
          unit: product.unit || "un",      // ✅ unidade
          stock: product.stock || 0,       // ✅ quantidade disponível
          active: true,
        },
      ],
    }))
  }

  function updateProduct(id, field, value) {
    setDistributor(prev => ({
      ...prev,
      products: prev.products.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }))
  }

  function deleteProduct(id) {
    setDistributor(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id),
    }))
  }

  /* ================= UNIDADES ================= */

  function addUnit(newUnit) {
    if (!newUnit) return
    setDistributor(prev => ({
      ...prev,
      unitsAvailable: [
        ...prev.unitsAvailable,
        newUnit,
      ],
    }))
  }

  /* ================= LOGO ================= */

  function setLogoFromFile(file) {
    const reader = new FileReader()

    reader.onload = e => {
      setDistributor(prev => ({
        ...prev,
        logo: e.target.result,
      }))
    }

    reader.readAsDataURL(file)
  }

  /* ================= SLUG ================= */

  function setPublicSlug(text) {
    const slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")

    setDistributor(prev => ({
      ...prev,
      publicSlug: slug,
    }))
  }

  /* ================= VALUE ================= */

  const value = {
    distributor,
    loading,

    setDistributor: updateDistributor,

    updateColor,
    updateDelivery,

    addProduct,
    updateProduct,
    deleteProduct,

    addUnit,

    setLogoFromFile,
    setPublicSlug,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando distribuidora…
      </div>
    )
  }

  return (
    <DistributorContext.Provider value={value}>
      {children}
    </DistributorContext.Provider>
  )
}

export function useDistributor() {
  const ctx = useContext(DistributorContext)

  if (!ctx) {
    throw new Error("useDistributor fora do Provider")
  }

  return ctx
}
