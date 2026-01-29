import { createContext, useContext, useState } from "react"

const DistributorContext = createContext()

export function DistributorProvider({ children }) {
  const [distributor, setDistributor] = useState({
    id: "demo",
    name: "FlowUX Distribuição",
    whatsapp: "",
    plan: "start", // start | pro | enterprise

    colors: {
      primary: "#f97316",
      secondary: "#ec4899",
      accent: "#3b82f6",
    },

    delivery: {
      enabled: true,
      fee: 10,
    },

    products: [],
  })

  function hasFeature(feature) {
    const map = {
      start: ["basic"],
      pro: ["basic", "finance", "reports"],
      enterprise: ["basic", "finance", "reports", "branding", "advanced"],
    }

    return map[distributor.plan].includes(feature)
  }

  return (
    <DistributorContext.Provider
      value={{ distributor, setDistributor, hasFeature }}
    >
      {children}
    </DistributorContext.Provider>
  )
}

export function useDistributor() {
  return useContext(DistributorContext)
}
