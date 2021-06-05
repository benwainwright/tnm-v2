import { FC } from "react"

import styled from "@emotion/styled"
import { BUTTON_BLACK } from "../../config"

export interface ButtonProps {
  onClick?: () => void
}

const ButtonElement = styled("button")`
  height: 100%;
  outline: 0;
  border-radius: 25px;
  border: 1px solid ${BUTTON_BLACK};
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  background: ${BUTTON_BLACK};
  color: white;
  line-height: 17px;
  font-size: 16px;
  padding: 10px;
  font-weight: 700;
  padding: 10px 30px;
`

ButtonElement.displayName = "button"

const Button: FC<ButtonProps> = props => (
  <ButtonElement>{props.children}</ButtonElement>
)

export default Button
