export const distributorMock = {
  id: "demo",
  name: "Flow UX Distribuição",
  whatsapp: "5599999999999",
  theme: "dark",

  orderMessage: "Olá, segue meu pedido:",

  delivery: {
    enabled: true,
    fee: 10,
  },

  colors: {
    primary: "#F97316",
    secondary: "#EC4899",
    accent: "#3B82F6",
  },

  categories: {
    Refrigerantes: true,
    Cervejas: true,
    Energéticos: true,
  },

  products: [
    {
      id: 1,
      name: "Coca-Cola 2L",
      category: "Refrigerantes",
      price: 10,
      unit: "un",
      active: true,
    },
    {
      id: 2,
      name: "Heineken",
      category: "Cervejas",
      price: 6,
      unit: "un",
      active: true,
    },
  ],
}
