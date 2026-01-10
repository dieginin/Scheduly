import type { AuthResponse, Role } from "../interfaces"

import { checkStatusMock } from "@/mocks/auth.mock"

export const checkStatusAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found")

  try {
    const { data } = await checkStatusMock()
    const user = { ...data.user, roles: data.user.roles as Role[] }

    if (!user.isActive) throw new Error("Your account is inactive")

    localStorage.setItem("token", data.token)
    return { ...data, user }
  } catch {
    localStorage.removeItem("token")
    throw new Error("Token expired or not valid")
  }
}
