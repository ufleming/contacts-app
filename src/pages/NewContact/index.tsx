import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { some } from "lodash"
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
  const [createContact, { isError: createContactError }] = contactsApi.useCreateContactMutation()
  const [
    createContactDetails,
    { isError: createContactDetailsError }
  ] = contactsApi.useCreateContactDetailsMutation()
  const hasError = some([createContactError, createContactDetailsError], true)

  const handleSubmit: SubmitHandler<ContactDetailsFormFields> = async data => {
    const {firstName, lastName, ...contactDetails} = data

    const [newContact] = await Promise.all([
      createContact({ firstName, lastName }),
      createContactDetails({ ...contactDetails }),
    ])

    if ('data' in newContact) {
      navigate(`/${newContact.data.id}`)
    }
  }

  return (
    <div className="contact-details px-2 px-lg-5 h-100">
      <ContactDetailsForm
        onSubmit={handleSubmit}
        contactData={contactData}
        hasServerError={hasError}
      />
    </div>
  )
}
