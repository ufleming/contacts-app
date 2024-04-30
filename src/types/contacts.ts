export type Contact = {
  id: string
  firstName: string
  lastName: string
}

export type ContactData = Omit<Contact, 'id'>

export type ContactDetails = {
  id: string
  phone: string
  email: string
  address: string
  note: string
}

export type ContactDetailsData = Omit<ContactDetails, 'id'>
