import schema from "./schema.graphql"
import { ApolloServer } from "apollo-server-lambda"
import { Query } from "./types"

// eslint-disable-next-line fp/no-rest-parameters
type QueryType = { [K in keyof Query]: (...args: unknown[]) => Query[K] }

interface Resolvers {
  Query: QueryType
}

const resolvers: Resolvers = {
  Query: {
    listCustomers: () => []
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: { Query: { ...resolvers.Query } }
})

export const handler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "*",
      credentials: true
    }
  }
})
