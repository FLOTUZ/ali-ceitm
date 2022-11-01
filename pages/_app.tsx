import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { initInterceptors } from "services/axios-client.service";

import type { AppProps } from "next/app";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AuthProvider from "providers/auth.provider";

initInterceptors();

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API + "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        {/* <AuthProvider> */}
          <Component {...pageProps} />
        {/* </AuthProvider> */}
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
