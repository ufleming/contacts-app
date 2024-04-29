import { FieldValues, UseFormRegister } from "react-hook-form"

export type InputProps<T extends FieldValues> = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  register: UseFormRegister<T>
  name: keyof T
  error?: string
}
