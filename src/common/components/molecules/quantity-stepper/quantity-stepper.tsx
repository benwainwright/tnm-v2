import { FC } from "react"
import { IconButton } from "@common/components/atoms"
import AddIcon from "@common/assets/images/icons/tnm-add.png"
import MinusIcon from "@common/assets/images/icons/tnm-subtract.png"
import styled from "@emotion/styled"

export interface QuantityStepperProps {
  value?: number
  onChange?: (newValue: number) => void
  max?: number
  min?: number
}

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 30px;
  padding: 5px;
`

const CountLabel = styled("div")`
  font-family: "Acumin Pro", Arial, sans-serif;
  flex-grow: 999;
  text-align: center;
`

const QuantityStepper: FC<QuantityStepperProps> = (props) => {
  const minusDisabled =
    props.value !== undefined &&
    props.min !== undefined &&
    props.value === props.min

  const plusDisabled =
    props.value !== undefined &&
    props.max !== undefined &&
    props.value === props.max

  return (
    <StyledDiv>
      <IconButton
        onClick={() => {
          if (!minusDisabled) {
            props.onChange?.((props.value ?? 0) - 1)
          }
        }}
        icon={MinusIcon}
        ariaLabel="Decrease"
        disabled={minusDisabled}
      />
      <CountLabel>{props.value ?? 0}</CountLabel>
      <IconButton
        onClick={() => {
          if (!plusDisabled) {
            props.onChange?.((props.value ?? 0) + 1)
          }
        }}
        icon={AddIcon}
        ariaLabel="Increase"
        disabled={plusDisabled}
      />
    </StyledDiv>
  )
}

export default QuantityStepper
