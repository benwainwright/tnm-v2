import { FC, useEffect, useState } from "react"
import { Hero, Layout } from "@app/components/containers"
import { API } from "@aws-amplify/api"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client"

import AccountIcon from "@app/assets/images/icons/TNM_Icons_Final_Account.png"
import Authenticated, {
  Redirect
} from "@app/components/organisms/login-and-register-box/authenticated"
import Seo from "../components/seo"
import styled from "@emotion/styled"
import { getClient } from "@app/api/client"
import { currentUser } from "@app/aws/authenticate"

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

const query = getClient("https://dev.api.thenutritionistmcr.com")

const Account: FC = () => {
  // const [data, setData] = useState()

  // useEffect(() => {
  //   ;(async () => {
  //     const user = await currentUser()
  //     const response = await query(
  //       gql`
  //         {
  //           getCustomerByUsername(username: "${user.username}") {
  //             firstName,
  //             surname,
  //             telephone
  //           }
  //         }
  //       `
  //     )
  //   })()
  // }, [])

  return (
    <Authenticated redirect={Redirect.IfLoggedOut} redirectPath="/login/">
      <Layout>
        <Hero>
          <YourAccountHeaderBox>
            <img src={AccountIcon} alt="" height="80" width="80" />
            <YourAccountHeader>Your Account</YourAccountHeader>
          </YourAccountHeaderBox>
        </Hero>
        <Seo title="Account" />
        <h2>You are logged in</h2>
      </Layout>
    </Authenticated>
  )
}

export default Account
