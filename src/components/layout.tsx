/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import { FC } from "react"
import Header from "./header"
import { Footer } from "./molecules"
import Hero from "./hero"
import "./layout.css"

import styled from "@emotion/styled"

const MainContainer = styled("main")`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Layout: FC = props => {
  return (
    <>
      <Header />
      <Hero />
      <MainContainer>{props.children}</MainContainer>
      <Footer />
    </>
  )
}

export default Layout
