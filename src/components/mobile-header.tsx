import { FC, Fragment } from "react"

import MenuIcon from "../images/icons/menu.inline.svg"
import TnmNLogo from "../images/icons/tnm-n-logo.inline.svg"
import styled from "@emotion/styled"

import GetStartedButton from "./get-started-button"

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
const MobileHeader: FC = () => (
  <Fragment>
    <MenuButtonContainerLeft>
      <StyledMenuIcon />
    </MenuButtonContainerLeft>
    <StyledTnmLogo />
    <MenuButtonContainerRight>
      <GetStartedButton>Get Started</GetStartedButton>
    </MenuButtonContainerRight>
  </Fragment>
)

export default MobileHeader
