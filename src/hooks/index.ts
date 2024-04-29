import { useLocation } from "react-router-dom"

export const useIsReadOnly = (): boolean => {
  const navigation = useLocation()
  const isEdit = navigation.pathname.includes("edit")
  const isNew = navigation.pathname === "/"

  return !isEdit && !isNew
}
