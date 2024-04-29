import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const layoutClasses = {
  inputLayoutContainerClasses: "contact-details-line form-group row py-2 flex-column flex-sm-row",
  labelLayoutClasses: "col-12 col-md-2 col-lg-2 col-form-label text-md-end py-1 px-2",
  inputLayoutClasses: "col-12 col-md-10 col-lg-6",
  btnClasses: "btn btn-light border border-dark btn-sm px-3",
}

export const contactDedailsFormScema = z.object({
  firstName: z.string().min(2, { message: "Must be 2 or more characters long" }),
  lastName: z.string().min(2, { message: "Must be 2 or more characters long" }),
  phone: z.string().regex(/^[\d-]*$/, {
    message: 'Phone should contain only digits and "-" character',
  }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string(),
  note: z.string(),
})

export const contactDedailsFormScemaResolver = zodResolver(contactDedailsFormScema)
