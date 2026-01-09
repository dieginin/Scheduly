import type { Role, User } from "@/auth/interfaces"

const user: User = {
  email: "test1@gmail.com",
  fullName: "User Test",
  id: "1",
  isActive: true,
  roles: ["user"],
  username: "user",
}

const admin: User = {
  email: "test2@gmail.com",
  fullName: "Admin Test",
  id: "2",
  isActive: true,
  roles: ["admin"],
  username: "admin",
}

const superU: User = {
  email: "test3@gmail.com",
  fullName: "Super Test",
  id: "3",
  isActive: true,
  roles: ["super"],
  username: "super",
}

export const getUserMock = async (role: Role) => {
  return new Promise<{ token: string; user: User }>(resolve => {
    setTimeout(() => {
      switch (role) {
        case "user":
          resolve({ token: "1", user: user })
          break
        case "admin":
          resolve({ token: "1", user: admin })
          break
        case "super":
          resolve({ token: "1", user: superU })
          break
        default:
          resolve({ token: "1", user: user })
      }
    }, 1000)
  })
}
