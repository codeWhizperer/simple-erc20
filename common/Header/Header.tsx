import { Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAccount, useConnectors, useStarknet } from "@starknet-react/core";
import { shortenAddress } from "../../web3/helper";
function Header() {
  const { account } = useAccount();
  const { connect, connectors } = useConnectors();

  const connected = !!account;
// eager connect
  useEffect(() => {
    if (!connectors.length) {
      return;
    }
    connect(connectors[0]);
  }, [connect, connectors]);
  return (
    <div className="header">
      <Text fontSize={24} fontWeight={600}>
        Starknet
      </Text>
      {connected ? (
        <Text fontSize={24} fontWeight={600}>
          {shortenAddress(account.address)}{" "}
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
