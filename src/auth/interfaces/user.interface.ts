export type Role = "user" | "admin" | "super"

export interface User {
  email: string
  name: string
  id: string
  isActive: boolean
  roles: Role[]
  username: string
}
