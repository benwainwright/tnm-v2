import { FC, useState, useEffect } from "react"
import { currentUser } from "@app/aws/authenticate"
import { navigate } from "gatsby"
import styled from "@emotion/styled"

export enum Redirect {
  IfLoggedIn,
  IfLoggedOut
}

interface AuthenticatedProps {
  redirect: Redirect
  redirectPath?: string
}

const Authenticated: FC<AuthenticatedProps> = props => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    ;(async () => {
      const foundUser = await currentUser()
      if (
        (!foundUser && props.redirect === Redirect.IfLoggedOut) ||
        (foundUser && props.redirect === Redirect.IfLoggedIn)
      ) {
        navigate(props.redirectPath ?? "/login/")
      } else {
        setAuthenticated(true)
      }
    })()
  }, [props.redirectPath, props.redirect])

  const HideShowDiv = styled.div`
    width: 100%;
    display: ${authenticated ? `block` : `none`};
    /* stylelint-disable */
  `

  return <HideShowDiv>{props.children}</HideShowDiv>
}

export default Authenticated
