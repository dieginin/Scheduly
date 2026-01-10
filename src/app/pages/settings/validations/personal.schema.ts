import { AlphanumericRegex, AlphanumericWithSpaceRegex, NAME_MIN, USERNAME_MIN, validationMessages } from "@/constants"

import { z } from "zod"

export type PersonalFormData = z.infer<typeof personalFormSchema>

export const personalFormSchema = z.object({
  name: z.string().trim().min(NAME_MIN, validationMessages.nameMin).regex(AlphanumericWithSpaceRegex, validationMessages.alphanumeric),
  email: z.email(validationMessages.validEmail).trim(),
  username: z.string().trim().min(USERNAME_MIN, validationMessages.usernameMin).regex(AlphanumericRegex, validationMessages.alphanumeric),
})
