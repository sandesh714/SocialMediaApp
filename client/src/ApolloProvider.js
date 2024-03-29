// import React from 'react';
import App from "./App"
// import ApolloClient from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider } from '@apollo/react-hooks'

// const httpLink = createHttpLink({
//     uri: 'http://localhost:5000/'
// })

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// })

// console.log(client);
// export default(
//     <React.StrictMode>
//     <ApolloProvider client={client}> 
//         <App />
//     </ApolloProvider>
//     </React.StrictMode>
// )


import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Create an ApolloClient instance and set up the URI of your GraphQL server
const client = new ApolloClient({
  uri: 'http://localhost:5000/', // Change this to your GraphQL server URI
  cache: new InMemoryCache()
});

const ApolloProviderr = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloProviderr;