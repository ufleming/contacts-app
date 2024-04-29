import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useIsReadOnly } from "@/hooks"
import { contactsApi } from "@/store/services/contacts"
import type { Contact } from "@/types/contacts"

import "./index.css"

type NavBlockProps = {
  title: string
  contacts: Contact[]
}

export const NavBlock = ({ title, contacts }: NavBlockProps) => {
  // TODO: optimize rendering
  const { contactId } = useParams<{ contactId: string }>()
  const isReadOnly = useIsReadOnly()
  const navigate = useNavigate()
  const [deleteContact] = contactsApi.useDeleteContactMutation()

  const handleDelete = () => {
    if (confirm("Remove contact?")) {
      deleteContact(contactId).then(() => navigate(`/`))
    }
  }

  return (
    <div className="fw-bold nav-block">
      <div className="nav-block-title ms-1 ms-md-3 mb-0 h5 text-secondary">{title}</div>
      <ul className="list-unstyled h5">
        {contacts.map(({ firstName, lastName, id }) => (
          <li key={id} className="mb-1">
            <NavLink
              key={id}
              to={`/${id}`}
              className={({ isActive }) =>
                `${isActive ? "active" : ""} d-block ps-3 ps-md-5 pe-2 py-1`
              }>
              {firstName} {lastName}
            </NavLink>
            {!isReadOnly && contactId == id && (
              <button
                onClick={handleDelete}
                className="remove-contact-btn p-0 btn btn-danger"
                aria-label="Remove Contact"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
