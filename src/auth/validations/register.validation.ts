import { AlphanumericRegex, NAME_MIN, PASSWORD_MIN, USERNAME_MIN, validationMessages } from "@/constants"

import { z } from "zod"

export type RegisterFormData = z.infer<typeof registerFormSchema>

export const registerFormSchema = z
  .object({
    name: z.string().min(NAME_MIN, validationMessages.nameMin).regex(AlphanumericRegex, validationMessages.alphanumeric),
    email: z.email(validationMessages.validEmail),
    username: z.string().min(USERNAME_MIN, validationMessages.usernameMin).regex(AlphanumericRegex, validationMessages.alphanumeric),
    password: z.string().min(PASSWORD_MIN, validationMessages.passwordMin),
    confirmPassword: z.string().min(PASSWORD_MIN, validationMessages.passwordMin),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: validationMessages.passwordMatch,
    path: ["confirmPassword"],
  })
