import { AlphanumericRegex, AlphanumericWithSpaceRegex, NAME_MIN, PASSWORD_MIN, USERNAME_MIN, validationMessages } from "@/constants"

import { z } from "zod"

export type RegisterFormData = z.infer<typeof registerFormSchema>

export const registerFormSchema = z
  .object({
    name: z.string().min(NAME_MIN, validationMessages.nameMin).regex(AlphanumericWithSpaceRegex, validationMessages.alphanumeric).trim(),
    email: z.email(validationMessages.validEmail).trim(),
    username: z.string().min(USERNAME_MIN, validationMessages.usernameMin).regex(AlphanumericRegex, validationMessages.alphanumeric).trim(),
    password: z.string().min(PASSWORD_MIN, validationMessages.passwordMin).trim(),
    confirmPassword: z.string().min(PASSWORD_MIN, validationMessages.passwordMin).trim(),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: validationMessages.passwordMatch,
    path: ["confirmPassword"],
  })
