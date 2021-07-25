import { Snack } from "."
import Exclusion from "./exclusion"
import Plan from "./plan"

export default interface Customer {
  id: string
  firstName: string
  surname: string
  createdAt?: string
  updatedAt?: string
  salutation: string
  address: string
  telephone: string
  startDate?: string
  paymentDayOfMonth?: number
  notes?: string
  email: string
  pauseStart?: string
  pauseEnd?: string
  daysPerWeek: number
  plan: Plan
  legacyPrice?: number
  snack: Snack
  breakfast: boolean
  exclusions: Exclusion[]
}
