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

export type SrpData = LoginFormData | MfaFormData | ChangePasswordFormData
