import { FC } from "react"
import { Hero, Layout } from "@common/components/containers"
import AccountIcon from "@common/assets/images/icons/TNM_Icons_Final_Account.png"
import Authenticated, {
  Redirect,
} from "@common/components/molecules/login-and-register-box/authenticated"
import Seo from "../components/seo"
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

const Account: FC = () => {
  return (
    <Layout>
      <Authenticated redirect={Redirect.IfLoggedOut} redirectPath="/login/">
        <Hero>
          <YourAccountHeaderBox>
            <img src={AccountIcon} alt="" height="80" width="80" />
            <YourAccountHeader>Your Account</YourAccountHeader>
          </YourAccountHeaderBox>
        </Hero>
        <Seo title="Account" />
        <h2>You are logged in</h2>
      </Authenticated>
    </Layout>
  )
}

export default Account
