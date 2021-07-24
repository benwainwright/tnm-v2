import { FC, useState, useEffect } from "react"
import { Footer, Header } from "@app/components/organisms"
import "./layout.css"
import { UserContext, User } from "@app/user-context"
import { currentUser } from "@app/aws/authenticate"
import { useAxe } from "@app/hooks"

import styled from "@emotion/styled"

const MainContainer = styled("main")`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 4rem;
`

const Layout: FC = props => {
  const [user, setUser] = useState<User | undefined>(undefined)
  useAxe()

  useEffect(() => {
    ;(async () => {
      setUser(await currentUser())
    })()
  }, [])

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <MainContainer>{props.children}</MainContainer>
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default Layout
