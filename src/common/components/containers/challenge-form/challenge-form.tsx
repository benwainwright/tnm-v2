import { Button } from "@common/components/atoms"
import { ErrorResponse } from "@common/types/error-response"
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
} from "react"
import styled from "@emotion/styled"

export interface ChallengeFormProps<T> {
  value?: T
  header?: string
  submitText?: string
  onSubmit?: (data: T) => void
  errors?: ErrorResponse[]
}

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 500px;
  border: 1px solid black;
  padding: 1.5rem 5rem 3rem 5rem;
  margin-top: -1px;
`

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormError = styled.div`
  color: red;
  height: 1em;
  font-family: "Acumin Pro", Arial, sans-serif;
  margin-top: 1rem;
`
const StyledH2 = styled.h2`
  font-family: "Acumin Pro", Arial, sans-serif;
  margin: 0 0 0 0;
`
StyledH2.displayName = "h2"

const addErrorMessages = (nodes: ReactNode, errorMessages?: ErrorResponse[]) =>
  Children.map(nodes, (node) => {
    if (!isValidElement(node)) {
      return node
    }

    const element: ReactElement = node

    const matchingMessage = errorMessages?.find(
      (message) => element.props.name === message.field
    )

    return matchingMessage ? (
      <element.type {...element.props} errorMessage={matchingMessage.message} />
    ) : (
      element
    )
  })

const addEventHandlers = <T,>(
  nodes: ReactNode,
  data: T,
  setData: Dispatch<SetStateAction<T>>
) => {
  return Children.map(nodes, (node) => {
    if (!isValidElement(node)) {
      return node
    }
    const element: ReactElement = node
    if (element.props.name) {
      return (
        <element.type
          {...element.props}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, [element.props.name]: event.target.value })
          }}
        />
      )
    }
    return <element.type {...element.props} />
  })
}

function assertFC<P>(
  _component: React.FC<P>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): asserts _component is React.FC<P> {}

function ChallengeForm<T>(
  props: PropsWithChildren<ChallengeFormProps<T>>
): ReactElement | null {
  const [data, setData] = useState<T | undefined>()
  const eventHandlersAdded = addEventHandlers(props.children, data, setData)
  const errorMessagesAdded = addErrorMessages(eventHandlersAdded, props.errors)
  const formErrors = props.errors?.filter((error) => !error.field) ?? []
  return (
    <FlexForm>
      {props.header ? (
        <FormHeader>
          <StyledH2>{props.header}</StyledH2>
          <FormError>
            {formErrors.map((error) => error.message).join(", ")}
          </FormError>
        </FormHeader>
      ) : undefined}
      {errorMessagesAdded}
      <Button
        primary
        onClick={(event) => {
          if (data) {
            props.onSubmit?.(data)
            event.preventDefault()
          }
        }}
      >
        {props.submitText ?? "Submit"}
      </Button>
    </FlexForm>
  )
}

assertFC(ChallengeForm)

export default ChallengeForm
