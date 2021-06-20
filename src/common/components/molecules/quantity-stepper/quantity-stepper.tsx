import { FC } from "react"
import { IconButton } from "@common/components/atoms"
import AddIcon from "@common/assets/images/icons/tnm-add.png"
import MinusIcon from "@common/assets/images/icons/tnm-subtract.png"
import styled from "@emotion/styled"

export interface QuantityStepperProps {
  value?: number
  onChange?: (newValue: number) => void
  label?: string
  variant: "default" | "smallLabelled"
  max?: number
  min?: number
}

const StyledDiv = styled("div")`
  display: flex;
  gap: 0.1rem;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 30px;
  padding: 5px;
`

const LabelText = styled.label`
  flex-grow: 999;
  font-family: "Acumin Pro", Arial, sans-serif;
  padding-left: 0.5rem;
`

const QuantityStepper: FC<QuantityStepperProps> = (props) => {
  const CountLabel = styled("div")`
    font-family: "Acumin Pro", Arial, sans-serif;
    font-weight: bold;
    flex-grow: ${props.variant === `smallLabelled` ? `0` : `999`};
    padding-left: ${props.variant === `smallLabelled` ? `0.5rem` : `0`};
    text-align: center;
  `
  const minusDisabled =
    props.value !== undefined &&
    props.min !== undefined &&
    props.value === props.min

  const plusDisabled =
    props.value !== undefined &&
    props.max !== undefined &&
    props.value === props.max

  const minusButton = (
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
  )

  const plusButton = (
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
  )

  const countLabel = (
    <CountLabel
      role="spinbutton"
      aria-valuenow={props.value ?? 0}
      aria-valuemin={props.min}
      aria-valuemax={props.max}
    >
      {props.value ?? 0}
    </CountLabel>
  )
  const widgets =
    props.variant === "smallLabelled"
      ? [
          countLabel,
          <LabelText>{props.label}</LabelText>,
          minusButton,
          plusButton,
        ]
      : [minusButton, countLabel, plusButton]
  return <StyledDiv>{widgets}</StyledDiv>
}

export default QuantityStepper
