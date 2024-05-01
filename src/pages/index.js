import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Hero from '../sections/Hero'
import client from '../components/Client'
import { ApolloProvider } from '@apollo/client'

const IndexPage = () => {
  console.log('ENV', process.env.GATSBY_API_URL)
  return (
    <ApolloProvider client={client}>
      <PageWrapper>
        <Hero />
      </PageWrapper>
    </ApolloProvider>
  )
}
export default IndexPage
