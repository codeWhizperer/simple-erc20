import { Button, Text } from "@chakra-ui/react";
import { connect, ConnectOptions } from "get-starknet";
import React, { useEffect, useState } from "react";
import { shortenAddress } from "../../web3/helper";
import { useTokenContract } from "../../web3/hooks/useGetContract";

function Header() {
  const [address, setAddress] = useState<string>("");
  const [connected, setConnected] = useState<boolean>();
  console.log(connected)
  const handleConnect = async () => {
    const res = await connect();
    if (!res?.isConnected) {
      await res?.enable({ starknetVersion: "v4" });
      setAddress(res?.selectedAddress || "");
      setConnected(res?.isConnected);
    } else {
      await res?.enable({ starknetVersion: "v4" });
      setAddress(res?.selectedAddress || "");
      setConnected(res?.isConnected);
    }
  };
  useEffect(() => {
    handleConnect();
  }, [address]);

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

      {/* <Text fontSize={24} fontWeight={600}>
          {/* {shortenAddress(address!)} */}
      {/* </Text> */}
    </div>
  );
}

export default Header;
