import { ContactDetailsFormFields } from "@/components/contactDetailsForm/types"

export type Contact = {
  id: string
  firstName: string
  lastName: string
}

export type ContactDetails = {
  id: string
  phone: string
  email: string
  address: string
  note: string
}

export type ContactDataPostBody = {
  contactId: string
  body: ContactDetailsFormFields
}
