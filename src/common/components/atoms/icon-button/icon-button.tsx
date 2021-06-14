import type { FC, MouseEvent } from "react"
import styled from "@emotion/styled"

export interface IconButtonProps {
  icon: any
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  ariaLabel: string
}

const StyledButton = styled("button")`
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  border: 0;
  background: 0;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
  }
`
StyledButton.displayName = "button"

const IconButton: FC<IconButtonProps> = (props) => (
  <StyledButton
    onClick={props.onClick}
    disabled={props.disabled}
    aria-label={props.ariaLabel}
  >
    <img src={props.icon} alt="" width="40px" height="40px" />
  </StyledButton>
)

export default IconButton
