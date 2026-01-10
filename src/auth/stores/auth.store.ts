import { type StateCreator, create } from "zustand"
import { checkStatusAction, loginAction, registerAction, updatePasswordAction, updateUserAction } from "../actions"

import type { User } from "../interfaces"
import { devtools } from "zustand/middleware"

type AuthStatus = "authenticated" | "unauthenticated" | "checking"

interface AuthState {
  status: AuthStatus
  token?: string
  user?: User

  checkStatus: () => Promise<boolean>
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, name: string, password: string, username: string) => Promise<boolean>
  updatePassword: (password: string) => Promise<boolean>
  updateUser: (email: string, name: string, username: string) => Promise<boolean>
}

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  checkStatus: async () => {
    try {
      const { token, user } = await checkStatusAction()
      set({ status: "authenticated", token, user })
      return true
    } catch {
      get().logout()
      return false
    }
  },
  login: async (username, password) => {
    try {
      const { token, user } = await loginAction(username, password)
      set({ status: "authenticated", token, user })
      return true
    } catch {
      get().logout()
      return false
    }
  },
  logout: () => {
    localStorage.removeItem("token")
    set({ status: "unauthenticated", token: undefined, user: undefined })
  },
  register: async (email, name, password, username) => {
    try {
      const { token, user } = await registerAction(email, name, password, username)
      set({ status: "authenticated", token, user })
      return true
    } catch {
      get().logout()
      return false
    }
  },
  updatePassword: async password => {
    try {
      const { token, user } = await updatePasswordAction(password)
      set({ token, user })
      return true
    } catch {
      return false
    }
  },
  updateUser: async (email, name, username) => {
    try {
      const { token, user } = await updateUserAction(email, name, username)
      set({ token, user })
      return true
    } catch {
      return false
    }
  },
})

export const useAuthStore = create<AuthState>()(devtools(storeApi))
