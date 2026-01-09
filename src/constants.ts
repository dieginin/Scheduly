export const NAME_MIN = 2
export const USERNAME_MIN = 3
export const PASSWORD_MIN = 6

export const AlphanumericRegex = /^[a-zA-Z0-9]+$/
export const AlphanumericWithSpaceRegex = /^[a-zA-Z0-9 ]+$/

export const validationMessages = {
  alphanumeric: "Must only contain letters and numbers",
  nameMin: `Must be ${NAME_MIN} characters min`,
  passwordMatch: "Passwords doesn't match",
  passwordMin: `Must be ${PASSWORD_MIN} characters min`,
  usernameMin: `Must be ${USERNAME_MIN} characters min`,
  validEmail: "Must enter a valid email",
}
