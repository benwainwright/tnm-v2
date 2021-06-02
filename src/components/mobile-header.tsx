import { Fragment } from "react"

import MenuIcon from "../images/icons/menu.svg"
import TnmNLogo from "../images/icons/tnm-n-logo.svg"
import styled from "@emotion/styled"

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
