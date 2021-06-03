/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import { FC } from "react"
import Header from "./header"
import Hero from "./hero"
import "./layout.css"

import styled from "@emotion/styled"

const MainContainer = styled("main")`
  padding: 88px 0 0 0;
`

const Layout: FC = props => {
  return (
    <>
      <Header />
      <Hero />
      <MainContainer>{props.children}</MainContainer>
    </>
  )
}

export default Layout
