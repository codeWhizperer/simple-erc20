import { Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAccount, useConnectors, useStarknet } from "@starknet-react/core";
import { shortenAddress } from "../../web3/helper";

function Header() {
  const { address } = useAccount();
  const { connect, connectors } = useConnectors();

  // const handleAccountChange = () => {
  //   const newAddress = window.starknet_argentX?.selectedAddress;
  // };

  // useEffect(() => {
  //   window.starknet_argentX?.on("accountsChanged", handleAccountChange);
  // }, [address]);

  const connected = !!address;
  // eager connect
  useEffect(() => {
    if (!connectors.length) {
      return;
    }
    connect(connectors[0]);
  }, [connect, connectors, address]);

  return (
    <div className="header">
      <Text fontSize={24} fontWeight={600}>
        Starknet
      </Text>
      {connected ? (
        <Text fontSize={24} fontWeight={600}>
          {shortenAddress(address)}{" "}
        </Text>
      ) : (
        <>
          {connectors.map((connector) => (
            <Button onClick={() => connect(connector)}>Connect Wallet</Button>
          ))}
        </>
      )}
    </div>
  );
}

export default Header;
