import { createContext, Dispatch, SetStateAction } from "react"

export type User = {
  name: string
  email: string
}

type UserContextType = {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: undefined
})
