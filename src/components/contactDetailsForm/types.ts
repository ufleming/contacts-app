import { z } from "zod"
import { SubmitHandler } from "react-hook-form"
import type { Contact, ContactDetails } from "@/types/contacts"
import { contactDedailsFormScema } from "./constants"

export type ContactDetailsFormProps = {
  contactData: ContactFormData
  onSubmit: SubmitHandler<ContactDetailsFormFields>
  hasServerError: boolean
}

export type ContactFormData = Omit<Contact, "id"> & Omit<ContactDetails, "id">

export type ContactDetailsFormFields = z.infer<typeof contactDedailsFormScema>
