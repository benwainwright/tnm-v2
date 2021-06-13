import { FC, ChangeEvent } from "react";

import styled from "@emotion/styled";

import { LABEL_TEXT, BUTTON_BLACK } from "../../../config";

const InputContainer = styled.div`
  font-family: "Acumin Pro";
  display: flex;
  flex-direction: column;
`;

const LabelRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const ErrorLabel = styled.label`
  font-family: "Acumin Pro";
  color: red;
  padding-bottom: 0.5rem;
  font-style: italic;
`;

ErrorLabel.displayName = "label";

const InputLabel = styled.label`
  font-family: "Acumin Pro";
  color: ${LABEL_TEXT};
  flex-grow: 999;
  padding-bottom: 0.5rem;
`;
InputLabel.displayName = "label";

const InputField = styled.input`
  font-family: "Acumin Pro";
  margin: 0;
  border-radius: 0;
  border: 1px solid ${BUTTON_BLACK};
  line-height: 1.5rem;
  padding: 0.5rem 0.5rem;
`;
InputField.displayName = "input";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  type?: string;
  errorMessage?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => (
  <InputContainer>
    <LabelRow>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      {props.errorMessage ? (
        <ErrorLabel htmlFor={props.name}>{props.errorMessage}</ErrorLabel>
      ) : null}
    </LabelRow>
    <InputField
      id={props.name}
      name={props.name}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  </InputContainer>
);

export default Input;
