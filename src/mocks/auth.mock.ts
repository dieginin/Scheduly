import type { AuthResponse, User } from "@/auth/interfaces"

const defaultPassword = "abc123"

const users: Record<string, User> = {
  1: {
    email: "zuk@pusa.mn",
    name: "Mattie Foster",
    id: "1",
    isActive: true,
    roles: ["user"],
    username: "user",
  },
  2: {
    email: "owoepakej@cobi.by",
    name: "Polly Goodman",
    id: "2",
    isActive: false,
    roles: ["admin"],
    username: "admin",
  },
  3: {
    email: "irake@ejnuepa.ch",
    name: "Emma Burton",
    id: "3",
    isActive: true,
    roles: ["super", "admin"],
    username: "super",
  },
}

export const getUserMock = async (id: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      const user = users[id]
      if (user) {
        resolve({ data: { token: id, user } })
      } else {
        reject(new Error("User not found"))
      }
    }, 1000)
  })
}

export const checkStatusMock = async () => {
  const token = localStorage.getItem("token")
  if (!token) {
    return { token: "", user: undefined }
  }
  return getUserMock(token)
}

export const loginMock = async (username: string, password: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      const user = Object.values(users).find(u => u.username === username)
      if (user && password === defaultPassword) {
        resolve({ data: { token: user.id, user } })
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
        if (Object.values(users).some(u => u.email === email)) return reject(new Error("Email already exists"))
        if (Object.values(users).some(u => u.username === username)) return reject(new Error("Username already exists"))

        const newUser: User = {
          email,
          name,
          id: Math.random().toString(36).substring(2, 15),
          isActive: true,
          roles: ["user"],
          username,
        }
        users[newUser.id] = newUser
        resolve({ data: { token: newUser.id, user: newUser } })
      } else {
        reject(new Error("All fields are required"))
      }
    }, 1000)
  })
}
