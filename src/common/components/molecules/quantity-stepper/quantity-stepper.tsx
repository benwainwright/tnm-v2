import { FC } from "react"
import { IconButton } from "@common/components/atoms"
import AddIcon from "@common/assets/images/icons/TNM_Icons_Final_Add.png"

interface QuantityStepperProps {
  value?: number
  onChange?: (newValue: number) => void
  max?: number
  min?: number
}

const QuantityStepper: FC<QuantityStepperProps> = (props) => {
  return (
    <div>
      <IconButton
        onClick={() => props.onChange?.((props.value ?? 0) - 1)}
        icon={AddIcon}
        ariaLabel="Decrease"
        disabled={
          props.value !== undefined &&
          props.min !== undefined &&
          props.value === props.min
        }
      />
      <div>{props.value ?? 0}</div>
      <IconButton
        onClick={() => props.onChange?.((props.value ?? 0) + 1)}
        icon={AddIcon}
        ariaLabel="Increase"
        disabled={
          props.value !== undefined &&
          props.max !== undefined &&
          props.value === props.max
        }
      />
    </div>
  )
}

export default QuantityStepper
