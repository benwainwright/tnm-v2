import { FC } from "react"
import styled from "@emotion/styled"

import SeasonalPattern from "../../../assets/images/Seasonal-pattern-spring-tnm.png"
import TnmLogoWhite from "../../../assets/images/TNM-Full-white.svg"

const StyledFooter = styled.footer`
  width: 100%;
  font-family: "Acumin Pro", Arial, sans-serif;
  box-sizing: border-box;
  position: relative;
  background: #253a3d;
`

const FooterStrip = styled.div`
  background: url(${SeasonalPattern});
  background-size: cover;
  background-position: 50%;
  height: 125px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`

const FooterContent = styled.div`
  padding: 100px 30px;
  background: #253a3d;
  color: white;
`

const FooterColumns = styled.div`
  display: flex;
  justify-content: space-between;
`

const FooterHeaders = styled.h2`
  margin: 0;
  padding: 0;
  color: #177f7a;
  font-size: 45px;
  line-height: 49px;
  font-weight: 700;
`
const FooterLink = styled.a`
  color: #cafbe2;
  font-size: 27px;
  line-height: 33px;
  font-family: acumin-pro-semi-condensed, sans-serif;
  text-decoration: none;
`

const FooterLi = styled.li`
  margin: 20px 0;
  padding: 0;
`

const UnStyledUl = styled.ul`
  list-style: none;
  padding: 0;
`

const TnmLogoWhiteAnchor = styled.a`
  text-indent: -9999px;
  width: 422px;
  height: 46px;
  display: block;
  margin-bottom: 100px;
  background: url(${TnmLogoWhite});
`

const Footer: FC = () => (
  <StyledFooter>
    <FooterStrip aria-hidden></FooterStrip>
    <FooterContent>
      <TnmLogoWhiteAnchor href="/">The Nutritionist MCR</TnmLogoWhiteAnchor>
      <FooterColumns>
        <div>
          <FooterHeaders>Sign up to emails</FooterHeaders>
        </div>

        <div>
          <FooterHeaders>Order</FooterHeaders>
          <UnStyledUl>
            <FooterLi>
              <FooterLink href="/the-plans/#UnStyledUltra-Micro">
                Ultra Micro
              </FooterLink>
            </FooterLi>
            <FooterLi>
              <FooterLink href="/the-plans/#Micro">Micro</FooterLink>
            </FooterLi>
            <FooterLi>
              <FooterLink href="/the-plans/#Equilibrium">
                Equilibrium
              </FooterLink>
            </FooterLi>
            <FooterLi>
              <FooterLink href="/the-plans/#Mass">Mass</FooterLink>
            </FooterLi>
          </UnStyledUl>
        </div>

        <div>
          <FooterHeaders>About</FooterHeaders>
          <UnStyledUl>
            <FooterLi>
              <FooterLink href="/our-story">Our Story</FooterLink>
            </FooterLi>
            <FooterLi>
              <FooterLink href="/why-choose-us">Why Choose Us?</FooterLink>
            </FooterLi>
            <FooterLi>
              <FooterLink href="/the-plans">Meal Plans</FooterLink>
            </FooterLi>
          </UnStyledUl>
        </div>

        <div>
          <FooterHeaders>Contact</FooterHeaders>
          <UnStyledUl>
            <FooterLi>
              <FooterLink href="/faq">FAQ</FooterLink>
            </FooterLi>
            <FooterLi>
              <FooterLink href="/get-started">Get Started</FooterLink>
            </FooterLi>
          </UnStyledUl>
        </div>
      </FooterColumns>
    </FooterContent>
  </StyledFooter>
)

export default Footer
