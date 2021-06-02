import { FC } from "react"

import styled from "@emotion/styled"
import MobileHeader from "./mobile-header"
import DesktopHeader from "./desktop-header"
import { useBreakpoints } from "../hooks/useBreakpoints"
import { breakpoints } from "../breakpoints"

const SiteNavbar = styled("nav")`
  display: flex;
  flex-direction: row;
  font-family: "Acumin Pro";
  font-weight: 700;
  height: 88px;
  padding: 0 30px;
  border-bottom: 1px solid black;
  position: fixed;
  width: 100%;
  background-color: white;
`

const Header: FC = () => {
  const currentBreakpoint = useBreakpoints(breakpoints)
  return (
    <SiteNavbar>
      {currentBreakpoint === "large" ? <DesktopHeader /> : <MobileHeader />}
    </SiteNavbar>
  )
}

export default Header
