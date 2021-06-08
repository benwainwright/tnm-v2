import { ReactElement, PropsWithChildren } from "react";
import styled from "@emotion/styled";

export interface ChallengeFormProps<T extends Record<string, unknown>> {
  header?: string;
  onSubmit?: (data: T) => void;
  errors?: ErrorResponse<T>;
}

interface ErrorResponse<T extends Record<string, unknown>> {
  field?: ChallengeFormProps<T>["onSubmit"] extends (...args: any) => any
    ? keyof Parameters<ChallengeFormProps<T>["onSubmit"]>[0]
    : never;
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

function assertFC<P>(
  _component: React.FC<P>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): asserts _component is React.FC<P> {}

function GenericBox<T extends Record<string, unknown>>(
  props: PropsWithChildren<ChallengeFormProps<T>>
): ReactElement | null {
  return (
    <FlexForm>
      {props.header ? <StyledH2>{props.header}</StyledH2> : null}
      {props.children}
    </FlexForm>
  );
}

assertFC(GenericBox);

export default GenericBox;
