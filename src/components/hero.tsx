import { FC } from "react"
import styled from "@emotion/styled"

const HeroBox = styled("div")`
  min-height: 530px;
  height: 390px;
  border-bottom: 1px solid black;
`

const Hero: FC = () => <HeroBox></HeroBox>

export default Hero
