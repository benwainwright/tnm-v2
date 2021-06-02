import { FC } from "react"

import styled from "@emotion/styled"
import MobileHeader from "./mobile-header"

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

const Header: FC = () => (
  <SiteNavbar>
    <MobileHeader />
  </SiteNavbar>
)

export default Header
