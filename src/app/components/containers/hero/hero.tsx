import { FC } from "react"
import styled from "@emotion/styled"
import { MENUBAR_HEIGHT } from "@app/config"

const HeroBox = styled("div")`
  min-height: 330px;
  padding-top: calc(${MENUBAR_HEIGHT} + 14px);
  width: 100%;
  height: 330px;
  border-bottom: 1px solid black;
  font-family: "Acumin Pro Semicondensed", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #d4f9e3;
`

const Hero: FC = props => <HeroBox>{props.children}</HeroBox>

export default Hero
