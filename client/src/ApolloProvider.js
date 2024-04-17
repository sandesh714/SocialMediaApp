import React from 'react';
import App from "./App"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from "@apollo/client/link/context";


const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})


const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });


// Create an ApolloClient instance and set up the URI of your GraphQL server
const client = new ApolloClient({ 
  link: authLink.concat(httpLink),// Change this to your GraphQL server URI
  cache: new InMemoryCache()
});

// function ApolloProvider () {
//   return (
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   );
// };

export default(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)