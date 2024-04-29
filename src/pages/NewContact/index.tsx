import { useEffect } from "react"
import { toast } from "react-toastify"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { contactsApi } from "@/store/services/contacts"
import { ContactDetailsForm } from "@/components/contactDetailsForm"
import type {
  ContactDetailsFormFields,
  ContactFormData,
} from "@/components/contactDetailsForm/types"

const contactData: ContactFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  note: "",
}

export const NewContact = () => {
  const navigate = useNavigate()
  const [createContact, { isError }] = contactsApi.useCreateContactMutation()

  useEffect(() => {
    if (isError) toast.error("Error: Couldn't submit your data")
  }, [isError])

  const handleSubmit: SubmitHandler<ContactDetailsFormFields> = data => {
    // TODO: fix data type
    createContact(data).then(({ data }) => {
      if (!isError) navigate(`/${data.id}`)
    })
  }

  return (
    <div className="contact-details px-2 px-lg-5 h-100">
      <ContactDetailsForm
        onSubmit={handleSubmit}
        contactData={contactData}
        hasServerError={isError}
      />
    </div>
  )
}
