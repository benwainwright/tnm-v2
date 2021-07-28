import { getClient } from "@app/api/client"
import { currentUser } from "@app/aws/authenticate"
import gql from "graphql-tag"
import { useEffect } from "react"
const query = getClient("https://dev.api.thenutritionistmcr.com")

export const useAccount = () => {
  useEffect(() => {
    ;(async () => {
      const user = await currentUser()
      const userDetails = await query(
        gql`
          {
            getCustomerByUsername(username: "${user.username}") {
              firstName,
              surname,
              telephone
            }
          }
        `
      )
    })()
  }, [])
}
