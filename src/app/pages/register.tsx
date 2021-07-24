import { FC } from "react"
import {
  LoginAndRegisterBox,
  Authenticated,
  Redirect
} from "@app/components/organisms"
import AccountIcon from "@app/assets/images/icons/TNM_Icons_Final_Account.png"
import Seo from "@app/components/seo"
import { Hero, Layout } from "@app/components/containers"
import styled from "@emotion/styled"

const YourAccountHeaderBox = styled("div")`
  text-align: center;
  color: #3b7d7a;
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const YourAccountHeader = styled("h1")`
  font-size: 40px;
  display: auto;
  margin: 0.5rem 0 0 0;
`

const Register: FC = () => {
  return (
    <Authenticated redirect={Redirect.IfLoggedIn} redirectPath="/account/">
      <Layout>
        <Seo title="Login or Register" />
        <Hero>
          <YourAccountHeaderBox>
            <img src={AccountIcon} alt="" height="80" width="80" />
            <YourAccountHeader>Your Account</YourAccountHeader>
          </YourAccountHeaderBox>
        </Hero>
        <LoginAndRegisterBox defaultTab="Register" />
      </Layout>
    </Authenticated>
  )
}

export default Register
