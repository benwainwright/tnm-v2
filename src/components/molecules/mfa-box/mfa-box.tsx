import { FC, useState } from "react";
import { Button, Input } from "../../atoms";
import { ChallengeForm } from "../../containers";
import styled from "@emotion/styled";

interface MfaData {
  code: string;
}

export interface ErrorResponse {
  field?: keyof MfaData;
  message: string;
}

export interface MfaBoxProps {
  onDoMfa?: (data: MfaData) => void;
  errors?: ErrorResponse;
}

const StyledP = styled.p`
  font-family: "Acumin Pro";
`;

const MfaBox: FC<MfaBoxProps> = (props) => {
  const [data, setData] = useState<MfaData>({ code: "" });

  return (
    <ChallengeForm header="Two Factor Authentication">
      <StyledP>
        A code has been sent to your phone. Please enter it in the box below.
      </StyledP>
      <Input
        label="Code"
        name="code"
        value={data.code}
        onChange={(event) => setData({ code: event.target.value })}
      />
      <Button
        onClick={(event) => {
          props.onDoMfa?.(data);
          event.preventDefault();
        }}
        primary
      >
        Submit
      </Button>
    </ChallengeForm>
  );
};

export default MfaBox;
