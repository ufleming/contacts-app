import { toast } from "react-toastify"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Contact, ContactDetails, ContactData, ContactDetailsData } from "@/types/contacts"

export const contactsApi = createApi({
  reducerPath: "contactsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Contacts", "Contact", "ContactDetails"],
  endpoints: builder => ({
    getContacts: builder.query<Contact[], void>({
      query: () => "contacts?_sort=firstName",
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't load contacts list`)
        return error
      },
      providesTags: () => ["Contacts"],
    }),
    getContact: builder.query<Contact, string>({
      query: contactId => `contacts/${contactId}`,
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't load the contact`)
        return error
      },
      providesTags: () => ["Contact"],
    }),
    getContactDetails: builder.query<ContactDetails, string>({
      query: contactId => `contactsDetail/${contactId}`,
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't load the contact details`)
        return error
      },
      providesTags: () => ["ContactDetails"],
    }),
    createContact: builder.mutation<Contact, ContactData>({
      query: body => ({
        url: `contacts`,
        method: 'POST',
        body,
      }),
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't create the contact`)
        return error
      },
      invalidatesTags: ["Contacts"],
    }),
    createContactDetails: builder.mutation<ContactDetails, ContactDetailsData>({
      query: body => ({
        url: `contactsDetail`,
        method: 'POST',
        body,
      }),
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't create the contact details`)
        return error
      },
      invalidatesTags: ["ContactDetails"],
    }),
    updateContact: builder.mutation<Contact, Contact>({
      query: ({ id, ...body }) => ({
        url: `contacts/${id}`,
        method: 'PUT',
        body,
      }),
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't update the contact`)
        return error
      },
      invalidatesTags: ["Contacts", "Contact"],
    }),
    updateContactDetails: builder.mutation<ContactDetails, ContactDetails>({
      query: ({ id, ...body }) => ({
        url: `contactsDetail/${id}`,
        method: 'PUT',
        body,
      }),
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't update the contact details`)
        return error
      },
      invalidatesTags: ["ContactDetails"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: id => ({ url: `contacts/${id}`, method: 'DELETE' }),
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't delete the contact`)
        return error
      },
      invalidatesTags: ["Contacts"],
    }),
    deleteContactDetails: builder.mutation<void, string>({
      query: id => ({ url: `contactsDetail/${id}`, method: 'DELETE' }),
      transformErrorResponse: error => {
        toast.error(`${error.status}: Couldn't update the contact details`)
        return error
      }
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useGetContactDetailsQuery,
  useUpdateContactMutation,
  useUpdateContactDetailsMutation,
} = contactsApi
