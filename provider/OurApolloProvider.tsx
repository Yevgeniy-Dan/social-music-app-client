import {
  ApolloClient,
  ApolloProvider,
  from,
  gql,
  HttpLink,
  InMemoryCache,
  Observable,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import React, { ReactNode } from 'react'

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL || 'http://localhost:8080/graphql',
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('persist:root')) || ''
  return {
    headers: {
      ...headers,
      Authorization: JSON.parse(token.auth).access_token
        ? `Bearer ${JSON.parse(token.auth).access_token}`
        : '',
    },
  }
})

const getNewToken = async () => {
  const newToken = () =>
    client.mutate({
      mutation: gql`
        mutation refresh {
          refresh {
            accessToken
          }
        }
      `,
    })
  try {
    const { data } = await newToken()
    const localStore = JSON.parse(localStorage.getItem('persist:root')) || ''
    let oldToken = JSON.parse(localStore.auth)

    oldToken = data.refresh.accessToken

    localStorage.setItem('persist:root', JSON.stringify(localStore))
    return data.refresh.accessToken
  } catch (error) {
    localStorage.removeItem('persist:root')
  }
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions.code === 'UNAUTHENTICATED') {
        return new Observable((observer) => {
          getNewToken()
            .then((accessToken) => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  // Re-add old headers
                  ...headers,
                  // Switch out old access token for new one
                  authorization: `Bearer ${accessToken}` || null,
                },
              }))
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              }
              // Retry last failed request
              forward(operation).subscribe(subscriber)
            })
            .catch((error) => {
              // No refresh or client token available, we force user to login
              observer.error(error)
            })
        })
      }
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink]),
  connectToDevTools: true,
})

const OurApolloProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default OurApolloProvider
