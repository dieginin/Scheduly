import type { AuthResponse, Role } from "../interfaces"

import { loginMock } from "@/mocks/auth.mock"
import { toast } from "sonner"

export const loginAction = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await loginMock(username, password)
    const user = { ...data.user, roles: data.user.roles as Role[] }

    localStorage.setItem("token", data.token)
    return { ...data, user }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred during login")
    throw error
  }
}
