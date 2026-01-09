import type { AuthResponse, Role, User } from "@/auth/interfaces"

const defaultPassword = "abc123"

const user: User = {
  email: "zuk@pusa.mn",
  name: "Mattie Foster",
  id: "1",
  isActive: true,
  roles: ["user"],
  username: "user",
}

const admin: User = {
  email: "owoepakej@cobi.by",
  name: "Polly Goodman",
  id: "2",
  isActive: true,
  roles: ["admin"],
  username: "admin",
}

const superU: User = {
  email: "irake@ejnuepa.ch",
  name: "Emma Burton",
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

export const checkStatusMock = async () => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem("token")
      if (!token) {
        resolve({ data: { user: user, token: "" } })
      } else if (token === "1") {
        resolve({ data: { user: user, token: "1" } })
      } else if (token === "2") {
        resolve({ data: { user: admin, token: "2" } })
      } else if (token === "3") {
        resolve({ data: { user: superU, token: "3" } })
      } else {
        reject(new Error("Invalid token"))
      }
    }, 1000)
  })
}

export const loginMock = async (password: string, username: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      if (username === "user" && password === defaultPassword) {
        resolve({ data: { user: user, token: "1" } })
      } else if (username === "admin" && password === defaultPassword) {
        resolve({ data: { user: admin, token: "2" } })
      } else if (username === "super" && password === defaultPassword) {
        resolve({ data: { user: superU, token: "3" } })
      } else {
        reject(new Error("Invalid credentials"))
      }
    }, 1000)
  })
}

export const registerMock = async (email: string, name: string, password: string, username: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      if (email && name && password && username) {
        if (email === user.email || email === admin.email || email === superU.email) return reject(new Error("Email already exists"))
        if (username === "user" || username === "admin" || username === "super") return reject(new Error("Username already exists"))

        const newUser: User = {
          email,
          name,
          id: Math.random().toString(36).substring(2, 15),
          isActive: true,
          roles: ["user"],
          username,
        }
        resolve({ data: { user: newUser, token: "new_token" } })
      } else {
        reject(new Error("All fields are required"))
      }
    }, 1000)
  })
}
