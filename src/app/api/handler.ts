import schema from "./schema.graphql"
import { ApolloServer } from "apollo-server-lambda"
import { listCustomers } from "./listCustomers"
import { getCustomerByUsername } from "./getCustomerByUsername"
import { Query } from "./types"
import * as Types from "./types"

type QueryType = {
  [K in keyof Query]: <T extends keyof typeof Types>(
    // eslint-disable-next-line fp/no-rest-parameters
    ...args: T[]
  ) => Query[K] | Promise<Query[K]>
}

interface Resolvers {
  Query: QueryType
}

const resolvers: Resolvers = {
  Query: {
    listCustomers,
    getCustomerByUsername
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
