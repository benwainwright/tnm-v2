import { FC } from "react"
import { LoginAndRegisterBox } from "@common/components/molecules"
import AccountIcon from "@common/assets/images/icons/TNM_Icons_Final_Account.png"
import Seo from "@common/components/seo"
import { Hero, Layout } from "@common/components/containers"
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

const Login: FC = () => {
  return (
    <Layout>
      <Seo title="Login" />
      <Hero>
        <YourAccountHeaderBox>
          <img src={AccountIcon} alt="" height="80" width="80" />
          <YourAccountHeader>Your Account</YourAccountHeader>
        </YourAccountHeaderBox>
      </Hero>
      <LoginAndRegisterBox />
    </Layout>
  )
}

export default Login
