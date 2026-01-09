import { AlphanumericRegex, PASSWORD_MIN, USERNAME_MIN, validationMessages } from "@/constants"

import { z } from "zod"

export type LoginFormData = z.infer<typeof loginFormSchema>

export const loginFormSchema = z.object({
  username: z.string().min(USERNAME_MIN, validationMessages.usernameMin).regex(AlphanumericRegex, validationMessages.alphanumeric),
  password: z.string().min(PASSWORD_MIN, validationMessages.passwordMin),
})
