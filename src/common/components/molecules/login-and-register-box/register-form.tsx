import { FC } from "react"
import { ChallengeForm } from "@common/components/containers"
import { Input } from "@common/components/atoms"
import { ErrorResponse } from "@common/types/error-response"
import { RegisterFormData } from "@common/types/srp-data"
import styled from "@emotion/styled"

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void
  errors?: ErrorResponse[]
}

const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`

const FormDivider = styled.hr`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='3' stroke-dasharray='4%2c 8' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
  width: 100%;
  height: 1px;
  margin: -5px 0;
  border: 0;
`

const RegisterForm: FC<RegisterFormProps> = (props) => {
  return (
    <ChallengeForm
      submitText="Register"
      onSubmit={props.onSubmit}
      errors={props.errors}
    >
      <FieldRow>
        <Input label="First Name" name="firstName" />
        <Input label="Last Name" name="lastName" />
      </FieldRow>
      <Input label="Email Address" name="email" type="email" />
      <Input label="Contact Number" name="contactNumber" />
      <FormDivider />
      <FieldRow>
        <Input label="Address Line 1" name="addressLine1" />
        <Input label="County" name="county" />
      </FieldRow>
      <FieldRow>
        <Input label="Address Line 2" name="addressLine2" />
        <Input label="Postcode" name="postcode" />
      </FieldRow>
      <Input label="Town/City" name="townOrCity" />
      <FormDivider />
    </ChallengeForm>
  )
}

export default RegisterForm