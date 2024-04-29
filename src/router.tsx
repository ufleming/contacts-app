import { createBrowserRouter } from "react-router-dom"

import { ContactDetailsPage } from "@/pages/ContactDetails"
import { NewContact } from "@/pages/NewContact"
import { NotFoundPage } from "@/pages/NotFound"
import { AppLayout } from "@/App"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/",
        element: <NewContact />,
      },
      {
        path: "/:contactId",
        element: <ContactDetailsPage />,
      },
      {
        path: "/:contactId/edit",
        element: <ContactDetailsPage />,
      },
    ],
  },
])
