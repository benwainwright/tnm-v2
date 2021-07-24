import Exclusion from "./exclusion"

export enum HotOrCold {
  Hot = "Hot",
  Cold = "Cold",
  Both = "Both"
}

export default interface Recipe {
  id: string
  name: string
  shortName: string
  hotOrCold: HotOrCold
  description?: string
  potentialExclusions: Exclusion[]
  createdAt?: string
  updatedAt?: string
}
