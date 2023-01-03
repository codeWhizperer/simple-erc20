import {
  useAccount,
  useConnectors,
  InjectedConnector,
} from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import { shortenAddress } from "../../web3/helper";

function Header() {
  const { address } = useAccount();

  const { connect } = useConnectors();

  const [connected, setConnected] = useState(false);

  
  const status = {
    isActive: connected,
    account: address!,
  };

  // useEffect(() =>{

  // },[address, connected])
  const connectWallet = () => {
    connect(new InjectedConnector({ options: { id: "argentX" } }));
    setConnected(true);
    localStorage.setItem("connectKey", JSON.stringify(status));
  };

  return (
    <div className="header">
      <h1>StarknetCore</h1>
      {!connected ? (
        <button onClick={connectWallet}>Connect with ArgentX</button>
      ) : (
        <p>{shortenAddress(address!)}</p>
      )}
    </div>
  );
}

export default Header;
