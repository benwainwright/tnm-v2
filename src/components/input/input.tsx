import { FC, ChangeEvent } from "react"

import styled from "@emotion/styled"

const InputContainer = styled.div`
  font-family: "Acumin Pro";
  display: flex;
  flex-direction: column;
`

const InputLabel = styled.label`
  font-family: "Acumin Pro";
`

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  name?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = props => {
  return (
    <InputContainer>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <input
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </InputContainer>
  )
}

export default Input
