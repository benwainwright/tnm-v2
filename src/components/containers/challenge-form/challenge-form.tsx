import { Button } from "../../atoms";
import {
  Dispatch,
  SetStateAction,
  Children,
  ReactElement,
  ReactNode,
  PropsWithChildren,
  ChangeEvent,
  useState,
  isValidElement,
} from "react";
import styled from "@emotion/styled";

export interface ChallengeFormProps<T extends Record<string, unknown>> {
  header?: string;
  submitText?: string;
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

const addEventHandlers = <T,>(
  nodes: ReactNode,
  data: T,
  setData: Dispatch<SetStateAction<T>>
) => {
  return Children.map(nodes, (node) => {
    if (!isValidElement(node)) {
      return node;
    }
    const element: ReactElement = node;
    if (element.props.name) {
      return (
        <element.type
          {...element.props}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, [element.props.name]: event.target.value });
          }}
        />
      );
    }
    return <element.type {...element.props} />;
  });
};

function assertFC<P>(
  _component: React.FC<P>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): asserts _component is React.FC<P> {}

function ChallengeForm<T extends Record<string, unknown>>(
  props: PropsWithChildren<ChallengeFormProps<T>>
): ReactElement | null {
  const [data, setData] = useState<T | undefined>();
  return (
    <FlexForm>
      {props.header ? <StyledH2>{props.header}</StyledH2> : null}
      {addEventHandlers(props.children, data, setData)}
      <Button
        onClick={(event) => {
          if (data) {
            props.onSubmit?.(data);
            event.preventDefault();
          }
        }}
      >
        {props.submitText ?? "Submit"}
      </Button>
    </FlexForm>
  );
}

assertFC(ChallengeForm);

export default ChallengeForm;
