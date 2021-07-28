import {
  ApolloClient,
  createHttpLink,
  DocumentNode,
  InMemoryCache
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { currentUser } from "@app/aws/authenticate"

export const getClient = (endPoint: string) => {
  const authLink = setContext(async (_, { headers }) => {
    const user = await currentUser()
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
      }
    }
  })

  const httpLink = createHttpLink({
    uri: endPoint
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  return async <T>(query: DocumentNode) =>
    (await client.query<T>({ query })).data
}

const getCustomerByUsername = (username: string) => {}
