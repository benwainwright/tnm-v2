import { FC, ChangeEvent } from "react"

import styled from "@emotion/styled"

import { LABEL_TEXT, BUTTON_BLACK } from "../../../config"

const InputContainer = styled.div`
  font-family: "Acumin Pro", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  flex-grow: 999;
`

const LabelRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`

const ErrorLabel = styled.label`
  font-family: "Acumin Pro", Arial, sans-serif;
  color: red;
  padding-bottom: 0.5rem;
  font-style: italic;
`

ErrorLabel.displayName = "label"

const InputLabel = styled.label`
  font-family: "Acumin Pro", Arial, sans-serif;
  color: ${LABEL_TEXT};
  flex-grow: 999;
  padding-bottom: 0.5rem;
`
InputLabel.displayName = "label"

export interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  name?: string
  type?: string
  error?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputField = styled.input<InputProps>`
  font-family: "Acumin Pro", Arial, sans-serif;
  margin: 0;
  border-radius: 0;
  border: 1px solid ${(props) => (props.error ? `red` : BUTTON_BLACK)};
  line-height: 1.5rem;
  padding: 0.5rem 0.5rem;
`
InputField.displayName = "input"

const Input: FC<InputProps> = (props) => (
  <InputContainer>
    <LabelRow>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
    </LabelRow>
    <InputField
      id={props.name}
      name={props.name}
      value={props.value}
      error={props.error}
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  </InputContainer>
)

export default Input
