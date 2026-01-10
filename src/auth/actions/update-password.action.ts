import type { AuthResponse } from "../interfaces/auth.response"
import { toast } from "sonner"
import { updatePasswordMock } from "@/mocks/auth.mock"

export const updatePasswordAction = async (password: string): Promise<AuthResponse> => {
  try {
    const { data } = await updatePasswordMock(password)

    return data
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred during update")
    throw error
  }
}
