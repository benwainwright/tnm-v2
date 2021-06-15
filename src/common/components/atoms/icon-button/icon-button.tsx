import type { FC, MouseEvent } from "react"
import styled from "@emotion/styled"

export interface IconButtonProps {
  icon: string
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
  border-radius: 50%;

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }

  &:hover:enabled {
    filter: opacity(50%);
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
