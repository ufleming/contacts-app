import { toast } from "react-toastify"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ContactDetailsFormFields } from "@/components/contactDetailsForm/types"
import type { Contact, ContactDetails, ContactDataPostBody } from "@/types/contacts"

export const contactsApi = createApi({
  reducerPath: "contactsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Contacts", "Contact", "ContactDetails"],
  endpoints: builder => ({
    getContacts: builder.query<Contact[], void>({
      query: () => "contacts?_sort=firstName",
      transformErrorResponse: ({ status }) => toast.error(`${status}: Couldn't load contacts list`),
      providesTags: () => ["Contacts"],
    }),
    getContact: builder.query<Contact, string>({
      query: contactId => `contacts/${contactId}`,
      transformErrorResponse: ({ status }) => toast.error(`${status}: Couldn't load the contact`),
      providesTags: () => ["Contact"],
    }),
    getContactDetails: builder.query<ContactDetails, string>({
      query: contactId => `contactsDetail/${contactId}`,
      transformErrorResponse: ({ status }) =>
        toast.error(`${status}: Couldn't load the contact details`),
      providesTags: () => ["ContactDetails"],
    }),

    // TODO: figure out how to make two requests in a single endpoint
    createContact: builder.mutation({
      queryFn: async (
        body: ContactDetailsFormFields,
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) => {
        const { firstName, lastName, ...rest } = body

        const createdContact = await fetchWithBaseQuery({
          url: `contacts`,
          method: "POST",
          body: { firstName, lastName },
        })

        await fetchWithBaseQuery({
          url: `contactsDetail`,
          method: "POST",
          body: { ...rest },
        })

        return createdContact
      },
      invalidatesTags: ["Contacts", "ContactDetails"],
    }),
    updateContact: builder.mutation({
      async queryFn(
        { contactId, body }: ContactDataPostBody,
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ) {
        const { firstName, lastName, ...rest } = body

        const { data: updateContact } = await fetchWithBaseQuery({
          url: `contacts/${contactId}`,
          method: "PUT",
          body: { firstName, lastName },
        })

        const { data: updateContactDetails } = await fetchWithBaseQuery({
          url: `contactsDetail/${contactId}`,
          method: "PUT",
          body: { ...rest },
        })

        return {
          data: {
            ...(updateContact as Contact),
            ...(updateContactDetails as ContactDetails),
          },
        }
      },
      invalidatesTags: ["Contacts", "ContactDetails"],
    }),
    deleteContact: builder.mutation({
      queryFn: async (contactId: string = "", _queryApi, _extraOptions, fetchWithBaseQuery) => {
        const data = await fetchWithBaseQuery({
          url: `contacts/${contactId}`,
          method: "DELETE",
        })

        await fetchWithBaseQuery({
          url: `contactsDetail/${contactId}`,
          method: "DELETE",
        })

        return data
      },
      invalidatesTags: ["Contacts"],
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useGetContactDetailsQuery,
  useUpdateContactMutation,
} = contactsApi
