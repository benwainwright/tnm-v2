import { FC, useState } from "react";
import { Button, Input } from "../../atoms";
import { ChallengeForm } from "../../containers";

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

const MfaBox: FC<MfaBoxProps> = (props) => {
  const [data, setData] = useState<MfaData>({ code: "" });

  return (
    <ChallengeForm header="Login">
      <p>Please enter the code sent to your phone</p>
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
        Login
      </Button>
    </ChallengeForm>
  );
};

export default MfaBox;
