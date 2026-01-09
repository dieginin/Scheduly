export const NAME_MIN = 2
export const USERNAME_MIN = 3
export const PASSWORD_MIN = 6

export const LetterOrNumbers = /^[a-zA-Z0-9]+$/

export const validationMessages = {
  lettersOrNumbers: "Must only contain letters and numbers",
  nameMin: `Must ${NAME_MIN} characters min`,
  passwordMatch: "Passwords doesn't match",
  passwordMin: `Must ${PASSWORD_MIN} characters min`,
  required: "Required",
  usernameMin: `Must ${USERNAME_MIN} characters min`,
  validEmail: "Must enter a valid email",
}
