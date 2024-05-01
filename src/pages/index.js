import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Hero from '../sections/Hero'
import client from '../components/Client'
import { ApolloProvider } from '@apollo/client'

const IndexPage = () => {
  return (
    <ApolloProvider client={client}>
      <PageWrapper>
        <Hero />
      </PageWrapper>
    </ApolloProvider>
  )
}
export default IndexPage
