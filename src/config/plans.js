export const PLAN_LIMITS = {
  start: {
    name: "Start",
    maxProducts: 20,
    finance: false,
    advancedColors: false,
    customBrand: false,
    deliveryZones: false,
  },

  pro: {
    name: "Pro",
    maxProducts: 200,
    finance: true,
    advancedColors: false,
    customBrand: true,
    deliveryZones: false,
  },

  enterprise: {
    name: "Enterprise",
    maxProducts: Infinity,
    finance: true,
    advancedColors: true,
    customBrand: true,
    deliveryZones: true,
  },
}
