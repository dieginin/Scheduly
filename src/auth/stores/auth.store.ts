import type { User } from "../interfaces"
import { type StateCreator, create } from "zustand"
import { devtools } from "zustand/middleware"

type AuthStatus = "authenticated" | "unauthenticated" | "checking"

interface AuthState {
  status: AuthStatus
  token?: string
  user?: User

  checkStatus: () => Promise<boolean>
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, fullName: string, password: string, username: string) => Promise<boolean>
}

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  checkStatus: async () => {
    try {
      throw new Error("Not implemented")
      //   const { token, roles, ...data } = await checkAuthAction()
      //   const user = { ...data, roles: roles as Role[] }
      //   set({ status: "authenticated", token, user })
      //   return true
    } catch {
      get().logout()
      return false
    }
  },
  login: async (username, password) => {
    try {
      throw new Error(`Not implemented. ${{ username, password }}`)
      //   const { token, roles, ...data } = await loginAction(username, password)
      //   const user = { ...data, roles: roles as Role[] }
      //   set({ status: "authenticated", token, user })
      //   return true
    } catch {
      get().logout()
      return false
    }
  },
  logout: () => set({ status: "unauthenticated", token: undefined, user: undefined }),
  register: async (email, fullName, password, username) => {
    try {
      throw new Error(`Not implemented. ${{ email, fullName, password, username }}`)
      //   const { token, roles, ...data } = await registerAction(email, fullName, password, username)
      //   const user = { ...data, roles: roles as Role[] }
      //   set({ status: "authenticated", token, user })
      //   return true
    } catch {
      get().logout()
      return false
    }
  },
})

export const useAuthStore = create<AuthState>()(devtools(storeApi))
