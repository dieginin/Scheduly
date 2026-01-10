import { useAuthStore } from "../stores"

export const useAuth = () => {
  const status = useAuthStore(state => state.status)
  const token = useAuthStore(state => state.token)
  const user = useAuthStore(state => state.user)

  const checkStatus = useAuthStore(state => state.checkStatus)
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)
  const register = useAuthStore(state => state.register)

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
