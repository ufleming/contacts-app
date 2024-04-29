import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Input } from "@/components/Input"
import { useIsReadOnly } from "@/hooks"
import { contactDedailsFormScemaResolver as resolver, layoutClasses } from "./constants"
import type { ContactDetailsFormProps, ContactDetailsFormFields as FormFields } from "./types"

import "./index.css"

export const ContactDetailsForm = (props: ContactDetailsFormProps) => {
  const { contactData, onSubmit, hasServerError } = props
  const { register, handleSubmit, reset, formState } = useForm<FormFields>({ resolver })
  const { errors } = formState
  const isReadOnly = useIsReadOnly()

  useEffect(() => {
    if (!hasServerError) reset(contactData)
  }, [contactData])

  const fieldDefaultConfig = {
    readOnly: isReadOnly,
  }

  return (
    <form className="h-100 d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {isReadOnly ? (
          <div className="col">
            <h1>
              {contactData.firstName} {contactData.lastName}
            </h1>
          </div>
        ) : (
          <>
            <div className="col-12 col-lg-4 mb-2 mb-lg-0 d-flex flex-column-reverse flex-md-column">
              <Input
                {...fieldDefaultConfig}
                register={register}
                error={errors.firstName?.message}
                type="text"
                name="firstName"
                id="contact-details-first_name"
                className="form-control form-control-lg"
              />
              <label htmlFor={`contact-details-first_name`}>first name</label>
            </div>
            <div className="col-12 col-lg-4 mb-2 mb-lg-0 d-flex flex-column-reverse flex-md-column">
              <Input
                {...fieldDefaultConfig}
                register={register}
                error={errors.lastName?.message}
                type="text"
                name="lastName"
                id="contact-details-last_name"
                className="form-control form-control-lg"
              />
              <label htmlFor={`contact-details-last_name`}>last name</label>
            </div>
          </>
        )}
      </div>
      <div className="row flex-grow-1">
        <div className="m-auto">
          <div className={layoutClasses.inputLayoutContainerClasses}>
            <label htmlFor={`contact-details-phone`} className={layoutClasses.labelLayoutClasses}>
              phone
            </label>
            <div className={layoutClasses.inputLayoutClasses}>
              <Input
                {...fieldDefaultConfig}
                register={register}
                error={errors.phone?.message}
                name="phone"
                id="contact-details-phone"
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className={layoutClasses.inputLayoutContainerClasses}>
            <label htmlFor={`contact-details-email`} className={layoutClasses.labelLayoutClasses}>
              email
            </label>
            <div className={`${layoutClasses.inputLayoutClasses}`}>
              {isReadOnly ? (
                <a
                  href={`mailto:${contactData.email}`}
                  className=" d-inline-block align-middle ms-2">
                  {contactData.email}
                </a>
              ) : (
                <Input
                  {...fieldDefaultConfig}
                  register={register}
                  error={errors.email?.message}
                  name="email"
                  id="contact-details-email"
                  type="text"
                  className="form-control"
                />
              )}
            </div>
          </div>
          <div className={layoutClasses.inputLayoutContainerClasses}>
            <label htmlFor={`contact-details-address`} className={layoutClasses.labelLayoutClasses}>
              address
            </label>
            <div className={layoutClasses.inputLayoutClasses}>
              <textarea
                {...register("address")}
                {...fieldDefaultConfig}
                className="form-control py-1 px-2"
                id={`contact-details-address`}
              />
            </div>
          </div>
          <div className={layoutClasses.inputLayoutContainerClasses}>
            <label htmlFor={`contact-details-note`} className={layoutClasses.labelLayoutClasses}>
              note
            </label>
            <div className={layoutClasses.inputLayoutClasses}>
              <textarea
                {...register("note")}
                {...fieldDefaultConfig}
                className="form-control py-1 px-2"
                id={`contact-details-note`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col">
          <Link to="/" className={layoutClasses.btnClasses}>
            +
          </Link>
        </div>
        <div className="col d-flex justify-content-end">
          {isReadOnly ? (
            <Link to="edit" className={layoutClasses.btnClasses}>
              Edit
            </Link>
          ) : (
            <button type="submit" className={layoutClasses.btnClasses}>
              Done
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
