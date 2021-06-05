import { FC } from "react"
import styled from "@emotion/styled"
import SeasonalPattern from "../../../images/Seasonal Pattern_SPRING_TNM.png"

const StyledFooter = styled.footer`
  width: 100%;
  height: auto;
  padding: 100px 30px;
  box-sizing: boeder-box;
  background: #253a3d;
  color: white;
  position: relative;
`

const FooterStrip = styled.div`
  background-image: url(${SeasonalPattern});
  background-size: cover;
  background-position: 50%;
  width: 100vw;
  height: 125px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`

const Footer: FC = () => (
  <StyledFooter>
    <FooterStrip></FooterStrip>
  </StyledFooter>
)

export default Footer
