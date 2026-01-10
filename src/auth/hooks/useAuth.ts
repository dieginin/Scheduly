import { useAuthStore } from "../stores"

export const useAuth = () => {
  const status = useAuthStore(s => s.status)
  const token = useAuthStore(s => s.token)
  const user = useAuthStore(s => s.user)

  const checkStatus = useAuthStore(s => s.checkStatus)
  const login = useAuthStore(s => s.login)
  const logout = useAuthStore(s => s.logout)
  const register = useAuthStore(s => s.register)

  const getUserInitials = () => {
    if (!user) return ""
    const names = user.name.split(" ")
    const initials = names.map(name => name[0]).join("")
    return initials.toUpperCase()
  }

  const getUserShortName = () => {
    if (!user) return ""
    const names = user.name.split(" ")
    return `${names[0]}${names.length > 1 ? " " + names[1][0] + "." : ""}`
  }

  return {
    status,
    token,
    user,

    getUserInitials,
    getUserShortName,

    checkStatus,
    login,
    logout,
    register,
  }
}
