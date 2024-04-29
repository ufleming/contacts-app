import { useNavigate, useParams } from "react-router-dom"
import { SubmitHandler } from "react-hook-form"
import { contactsApi } from "@/store/services/contacts"
import { ContactDetailsForm } from "@/components/contactDetailsForm"
import type {
  ContactDetailsFormFields,
  ContactFormData,
} from "@/components/contactDetailsForm/types"

// TODO: reduce complexity
export const ContactDetailsPage = () => {
  const navigate = useNavigate()
  const { contactId } = useParams<{ contactId: string }>()

  if (!contactId) {
    navigate(`/notfound`)
    return null
  }

  const [updateContact, { isError: updateContactError }] = contactsApi.useUpdateContactMutation()
  const { data: contactData, isError: getContactError } = contactsApi.useGetContactQuery(contactId)
  const { data: contactDetails, isError: getContactDetailError } = contactsApi.useGetContactDetailsQuery(contactId)
  const hasError = updateContactError || getContactError || getContactDetailError

  if (updateContactError) {
    return <p className="text-center text-danger">Error: Couldn't submit your data</p>
  }

  if (getContactDetailError) {
    return <p className="text-center text-danger">Error: Couldn't load contact details</p>
  }

  if (!contactDetails || !contactData) {
    return <p className="text-center">Loading contact details</p>
  }

  const { id: contactDataId, ...restContactData } = contactData
  const { id, ...restContactDetails } = contactDetails

  const handleSubmit: SubmitHandler<ContactDetailsFormFields> = data => {
    updateContact({ contactId, body: data })
    navigate(`/${contactId}`)
  }

  const prepareData: ContactFormData = { ...restContactData, ...restContactDetails }

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
