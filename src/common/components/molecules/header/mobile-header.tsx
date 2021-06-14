import { FC, Fragment } from "react"

import MenuIcon from "../../../assets/images/icons/menu.svg"
import TnmNLogo from "../../../assets/images/icons/tnm-n-logo.inline.svg"
import styled from "@emotion/styled"
import { Button } from "../../atoms"

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
      <Button primary>Get Started</Button>
    </MenuButtonContainerRight>
  </Fragment>
)

export default MobileHeader
