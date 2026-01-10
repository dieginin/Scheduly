import type { AuthResponse } from "../interfaces/auth.response"
import { toast } from "sonner"
import { updateUserMock } from "@/mocks/auth.mock"

export const updateUserAction = async (email: string, fullName: string, username: string): Promise<AuthResponse> => {
  try {
    const { data } = await updateUserMock(email, fullName, username)

    return data
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred during update")
    throw error
  }
}
