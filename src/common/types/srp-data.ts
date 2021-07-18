export interface LoginFormData {
  email: string
  password: string
}

export interface MfaFormData {
  code: string
}

export interface ChangePasswordFormData {
  password: string
}

export interface RegisterFormData {
  username: string
  firstName: string
  lastName: string
  email: string
  contactNumber: string
  postcode: string
  addressLine1: string
  addressLine2?: string
  county?: string
  townOrCity?: string
}

export type SrpData = LoginFormData | MfaFormData | ChangePasswordFormData
