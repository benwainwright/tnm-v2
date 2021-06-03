import { FC } from "react"

import styled from "@emotion/styled"

export interface ButtonProps {
  onClick: () => void
}

const ButtonElement = styled("button")`
  height: 100%;
  outline: 0;
  border-radius: 25px;
  border: 0;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  background: #292929;
  color: white;
  line-height: 17px;
  font-size: 16px;
  padding: 10px;
  font-weight: 700;
  padding: 10px 30px;
`

const Button: FC<ButtonProps> = props => (
  <ButtonElement>{props.children}</ButtonElement>
)

export default Button
