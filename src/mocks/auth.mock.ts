import type { AuthResponse, User } from "@/auth/interfaces"

const getRandomInt = (max: number) => Math.floor(Math.random() * max)

const defaultPassword = "abc123"
const timeoutDelay = 500 + getRandomInt(2500)

const users: Record<string, User> = {
  "1": {
    email: "zuk@pusa.mn",
    name: "Mattie Foster",
    id: "1",
    isActive: true,
    roles: ["user"],
    username: "user",
  },
  "2": {
    email: "owoepakej@cobi.by",
    name: "Polly Goodman",
    id: "2",
    isActive: false,
    roles: ["admin"],
    username: "admin",
  },
  "3": {
    email: "irake@ejnuepa.ch",
    name: "Emma Burton",
    id: "3",
    isActive: true,
    roles: ["super", "admin"],
    username: "super",
  },
}

export const getUserMock = async (id: string) => {
  return new Promise<{ data: AuthResponse }>(resolve => {
    setTimeout(() => {
      const user = users[id]
      resolve({ data: { token: id, user } })
    }, timeoutDelay)
  })
}

export const checkStatusMock = async () => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem("token")
      if (!token) return reject(new Error("Not authenticated"))

      const user = users[token]
      if (!user) return reject(new Error("Invalid token"))

      resolve({ data: { token, user } })
    }, timeoutDelay)
  })
}

export const loginMock = async (username: string, password: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      const user = Object.values(users).find(u => u.username === username)
      if (!(user && password === defaultPassword)) return reject(new Error("Invalid credentials"))

      resolve({ data: { token: user.id, user } })
    }, timeoutDelay)
  })
}

export const registerMock = async (email: string, name: string, _: string, username: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
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
    }, timeoutDelay)
  })
}

export const updateUserMock = async (email: string, name: string, username: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem("token")
      if (!token) return reject(new Error("Not authenticated"))

      const currentUser = users[token]
      if (!currentUser) return reject(new Error("Invalid token"))

      if (Object.values(users).some(u => u.email === email && u.id !== token)) return reject(new Error("Email already exists"))
      if (Object.values(users).some(u => u.username === username && u.id !== token)) return reject(new Error("Username already exists"))

      const updatedUser: User = {
        ...currentUser,
        email,
        name,
        username,
      }
      users[token] = updatedUser
      resolve({ data: { token, user: updatedUser } })
    }, timeoutDelay)
  })
}

export const updatePasswordMock = async (password: string) => {
  return new Promise<{ data: AuthResponse }>((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem("token")
      if (!token) return reject(new Error("Not authenticated"))

      const user = users[token]
      if (!user) return reject(new Error("Invalid token"))
      console.log(`New password: ${password}`)

      resolve({ data: { token, user } })
    }, timeoutDelay)
  })
}
