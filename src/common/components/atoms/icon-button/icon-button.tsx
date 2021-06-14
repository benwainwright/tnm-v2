import type { FC, MouseEvent } from "react"
import styled from "@emotion/styled"

export interface IconButtonProps {
  icon: any
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const StyledButton = styled("button")`
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  border: 0;
  background: 0;
  cursor: pointer;
`

const IconButton: FC<IconButtonProps> = (props) => (
  <StyledButton onClick={props.onClick} disabled={props.disabled}>
    <props.icon />
  </StyledButton>
)

export default IconButton
