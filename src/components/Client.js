import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }
  if (networkError) {
    // console.log(`[Network error]: ${networkError}`)
    if (networkError.message.includes('401')) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
    }
  }
})

const link = from([errorLink, new HttpLink({ uri: process.env.GATSBY_API_URL })])

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const Client = new ApolloClient({
  cache: new InMemoryCache({}),
  link: authLink.concat(link),
})

export default Client
