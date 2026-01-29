import { useDistributor } from "../context/DistributorContext"
import { PLAN_LIMITS } from "../config/plans"

export function usePlan() {
  const { distributor } = useDistributor()

  const planName =
    distributor?.plan?.name &&
    PLAN_LIMITS[distributor.plan.name]
      ? distributor.plan.name
      : "start"

  return PLAN_LIMITS[planName]
}
