import { useEffect } from "react"
import { useThemeStore } from "@/stores"

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export const ThemeListener = () => {
  const theme = useThemeStore(s => s.theme)

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = () => {
      root.classList.remove("light", "dark")

      if (theme === "system") {
        root.classList.add(getSystemTheme())
      } else {
        root.classList.add(theme)
      }
    }

    applyTheme()

    const onChange = () => {
      if (theme === "system") applyTheme()
    }

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [theme])
  return null
}
