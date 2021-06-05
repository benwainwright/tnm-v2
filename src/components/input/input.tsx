import { FC, Fragment, ChangeEvent } from "react"

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  name?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = props => {
  return (
    <Fragment>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </Fragment>
  )
}

export default Input
