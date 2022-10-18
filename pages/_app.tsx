import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { initInterceptors } from "services/axios-client.service";

import type { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

initInterceptors();

const local = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API + "/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={local}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
