import { useNavigate, useParams } from "react-router-dom"
import { some } from "lodash"
import { SubmitHandler } from "react-hook-form"
import { contactsApi } from "@/store/services/contacts"
import { ContactDetailsForm } from "@/components/contactDetailsForm"
import type {
  ContactDetailsFormFields,
  ContactFormData,
} from "@/components/contactDetailsForm/types"

// TODO: [Refactoring] reduce complexity
export const ContactDetailsPage = () => {
  const navigate = useNavigate()
  const { contactId } = useParams<{ contactId: string }>()

  if (!contactId) {
    navigate(`/notfound`)
    return null
  }

  const [updateContact, { isError: updateContactError }] = contactsApi.useUpdateContactMutation()
  const [updateContactDetails, { isError: updateContactDetailsError }] = contactsApi.useUpdateContactDetailsMutation()
  const { data: contactData, isError: getContactError } = contactsApi.useGetContactQuery(contactId)
  const { data: contactDetails, isError: getContactDetailsError } = contactsApi.useGetContactDetailsQuery(contactId)
  const hasError = some([updateContactError, updateContactDetailsError, getContactError, getContactDetailsError], true)

  if (!contactDetails || !contactData) {
    return <p className="text-center">Loading contact details</p>
  }

  const { firstName, lastName } = contactData
  const { id, ...restContactDetails } = contactDetails

  const handleSubmit: SubmitHandler<ContactDetailsFormFields> = async data => {
    const {firstName, lastName, ...contactDetails} = data

    await Promise.all([
      updateContact({ id, firstName, lastName }),
      updateContactDetails({ id, ...contactDetails }),
    ])

    navigate(`/${contactId}`)
  }

  const prepareData: ContactFormData = { firstName, lastName, ...restContactDetails }

  return (
    <div className="contact-details px-2 px-lg-5 h-100">
      <ContactDetailsForm
        onSubmit={handleSubmit}
        contactData={prepareData}
        hasServerError={hasError}
      />
    </div>
  )
}
