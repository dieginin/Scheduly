import { AlphanumericRegex, AlphanumericWithSpaceRegex, NAME_MIN, PASSWORD_MIN, USERNAME_MIN, validationMessages } from "@/constants"

import { z } from "zod"

export type RegisterFormData = z.infer<typeof registerFormSchema>

export const registerFormSchema = z
  .object({
    name: z.string().trim().min(NAME_MIN, validationMessages.nameMin).regex(AlphanumericWithSpaceRegex, validationMessages.alphanumeric),
    email: z.email(validationMessages.validEmail).trim(),
    username: z.string().trim().min(USERNAME_MIN, validationMessages.usernameMin).regex(AlphanumericRegex, validationMessages.alphanumeric),
    password: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
    confirmPassword: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: validationMessages.passwordMatch,
    path: ["confirmPassword"],
  })
