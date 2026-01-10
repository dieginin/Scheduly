import type { AuthResponse } from "../interfaces/auth.response"
import { registerMock } from "@/mocks/auth.mock"
import { toast } from "sonner"

export const registerAction = async (email: string, name: string, password: string, username: string): Promise<AuthResponse> => {
  try {
    const { data } = await registerMock(email, name, password, username)

    return data
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred during register")
    throw error
  }
}
