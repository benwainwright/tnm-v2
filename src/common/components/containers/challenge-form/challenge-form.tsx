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
  submitText?: string
  onSubmit?: (data: T) => void
  errors?: ErrorResponse[]
}

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

    const matchingMessage = errorMessages?.find(
      (message) => node.props.name === message.field
    )

    return matchingMessage ? (
      <node.type {...node.props} errorMessage={matchingMessage.message} />
    ) : (
      node
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

    const { type: Type, props } = node
    const { name, children } = props

    return name ? (
      <Type
        {...props}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setData({ ...data, [name]: event.target.value })
        }
      >
        {addEventHandlers(children, data, setData)}
      </Type>
    ) : (
      <Type {...props}>{addEventHandlers(children, data, setData)}</Type>
    )
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
      <FormHeader>
        <FormError role="alert">
          {formErrors
            .map((error) =>
              error.message.endsWith(".")
                ? error.message.slice(0, -1)
                : error.message
            )
            .join(", ")}
        </FormError>
      </FormHeader>
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
