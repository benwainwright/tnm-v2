import { FC } from "react"

import styled from "@emotion/styled"
import MenuIcon from "../images/icons/menu.svg"
import TnmNLogo from "../images/icons/tnm-n-logo.svg"

const SiteNavbar = styled("nav")`
  display: flex;
  flex-direction: row;
  height: 88px;
  padding: 0 30px;
  border-bottom: 1px solid black;
  position: fixed;
  width: 100%;
  background-color: white;
`

const GetStartedButton = styled("button")`
  height: 100%;
  outline: 0;
  border-radius: 25px;
  border: 0;
  cursor: pointer;
  text-align: center;
  background: #292929;
  color: white;
`

const StyledMenuIcon = styled(MenuIcon)`
  width: 40px;
`
const MenuButtonContainerLeft = styled("div")`
  margin: 24px 0;
  width: 200px;
  text-align: left;
`

const MenuButtonContainerRight = styled("div")`
  margin: 24px 0;
  width: 200px;
  text-align: right;
`

const StyledTnmLogo = styled(TnmNLogo)`
  flex-grow: 100;
  margin: 14px 0;
`

const Header: FC = () => (
  <SiteNavbar>
    <MenuButtonContainerLeft>
      <StyledMenuIcon />
    </MenuButtonContainerLeft>
    <StyledTnmLogo />
    <MenuButtonContainerRight>
      <GetStartedButton>Get Started</GetStartedButton>
    </MenuButtonContainerRight>
  </SiteNavbar>
)

export default Header
