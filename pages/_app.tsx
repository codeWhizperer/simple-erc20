import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
InjectedConnector

export default function App({ Component, pageProps }: AppProps) {
  const connectors = [
    new InjectedConnector({ options: { id: 'argentX' }})
  ]
  return (
    <StarknetProvider connectors={connectors}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StarknetProvider>
  );
}
