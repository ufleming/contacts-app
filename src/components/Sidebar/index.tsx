import { useMemo } from "react"
import { useGetContactsQuery } from "@/store/services/contacts"
import { NavBlock } from "./components/NavBlock"
import { groupAlphabetically } from "./helpers"

export const Sidebar = () => {
  const { data, isLoading } = useGetContactsQuery()
  const grouped = useMemo(() => groupAlphabetically(data || [], "firstName"), [data])
  const sortedKeys = useMemo<string[]>(() => Object.keys(grouped).sort(), [grouped])

  return (
    <div className="overflow-auto mh-100">
      {isLoading && <p className="text-center">Loading contacts</p>}

      <nav className="d-flex flex-column text-truncate">
        {sortedKeys.map(item => (
          <NavBlock key={item} title={item} contacts={grouped[item]} />
        ))}
      </nav>
    </div>
  )
}
