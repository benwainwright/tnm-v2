import { FC } from "react";
import styled from "@emotion/styled";

export interface ChallengeFormProps {
  header?: string;
}

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 500px;
  border: 1px solid black;
  padding: 1.5rem 5rem 3rem 5rem;
  margin-top: -1px;
`;

const StyledH2 = styled.h2`
  font-family: "Acumin Pro";
  margin: 0 0 1rem 0;
`;
StyledH2.displayName = "h2";

const ChallengeForm: FC<ChallengeFormProps> = (props) => (
  <FlexForm>
    {props.header ? <StyledH2>{props.header}</StyledH2> : null}
    {props.children}
  </FlexForm>
);

export default ChallengeForm;
