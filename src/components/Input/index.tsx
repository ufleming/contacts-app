import { ContactDetailsFormFields } from "@/components/contactDetailsForm/types"
import type { InputProps } from "./types"

export const Input = (props: InputProps<ContactDetailsFormFields>) => {
  // TODO: optimize rendering
  const { error, register, ...inputProps } = props

  return (
    <div className="form-control-input">
      <input
        {...inputProps}
        {...register(inputProps.name)}
        className={`${inputProps.className} py-1 px-2`}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  )
}
