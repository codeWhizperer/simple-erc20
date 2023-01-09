import { Button, Text } from "@chakra-ui/react";
import { connect, ConnectOptions } from "get-starknet";
import React, { useEffect, useState } from "react";
import { shortenAddress } from "../../web3/helper";
import { useTokenContract } from "../../web3/hooks/useGetContract";

type IHeader = {
  address:string,
  connected:boolean,
  handleConnect: () => void
}

function Header({address, connected, handleConnect}:IHeader) {

  return (
    <div className="header">
      <Text fontSize={24} fontWeight={600}>
        StarknetCore
      </Text>
      {!connected ? (
        <Button onClick={handleConnect}>Connect with ArgentX</Button>
      ) : (
        <Text fontSize={24} fontWeight={600}>
          {shortenAddress(address!)}{" "}
        </Text>
      )}

    </div>
  );
}

export default Header;
