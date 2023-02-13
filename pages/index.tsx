import React, { useMemo } from "react";
import Layout from "../Layout/layout";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { feltToString } from "../web3/helper";
import BigNumber from "bignumber.js";
import {  useState } from "react";
import Header from "../common/Header/Header";
import abi from "../web3/abi.json";
import { address as contractAddress } from "../web3/constant";
import {
  useAccount,
  useContract,
  useStarknetCall,
  useStarknetExecute,
} from "@starknet-react/core";



export default function Home() {
  let [recipient, setRecipient] = useState<string>("");
  let [amount, setAmount] = useState<string>("");
  const [receiver, setReceiver] = useState("");
  const [token, setToken] = useState("");

  const handleChange = ({ target }: any) => {
    const elementName = target.name;
    const value = target.value;

    switch (elementName) {
      case "address":
        if (value === "") return setRecipient("");
        else if (value) return setRecipient(value);
      case "amount":
        if (value === "") return setAmount("");
        else if (value) return setAmount(value);
      case "receiver":
        if (value === "") return setReceiver("");
        else if (value) return setReceiver(value);
      case "tokenAmount":
        if (value === "") return setToken("");
        else if (value) return setToken(value);
    }
  };

  const { address } = useAccount();
  const { contract } = useContract({ abi: abi, address: contractAddress });

// Read Transactions
  const { data, loading: balLoading } = useStarknetCall({
    contract,
    method: "balanceOf",
    args: [address],
  });
  const balance = data ? parseInt(data[0].low.toString()) : undefined;

// fetch name
  const { data: nameData, loading: namLoading } = useStarknetCall({
    contract,
    method: "name",
    args: [],
  });
  const name = nameData ? new BigNumber(nameData[0].toString()) : "";

// Write transactions

  const calls = {
    contractAddress: contractAddress,
    entrypoint: "mint",
    calldata: [recipient, amount, 0],
  };
  const {
    execute,
    data: mintdata,
    error,
    loading,
  } = useStarknetExecute({ calls });

  const callsTransfer = {
    contractAddress: contractAddress,
    entrypoint: "transfer",
    calldata: [receiver, token, 0]
  }

  const {
    execute: executeTransfer,
    data: transferData,
    error: transferError,
    loading: transferLoading,
  } = useStarknetExecute({ calls: callsTransfer });

  const handleMint = () =>{
    if (recipient !== "" && amount !== "") {
      execute();
    } else {
      alert("Both recipient address and amount must be filled in.");
    }
  }
  const handleTransfer = () => {
    if (receiver !== "" && token !== "") {
      executeTransfer();
    } else {
      alert("Both recipient address and amount must be filled in.");
    }
  };
  return (
    <>
      <Header />

      <Container marginY={"2rem"} maxW="container.lg" color="#262626">
        <Text
          className={`${balLoading && "animate-pulse"} ${
            !balance && "text-slate-400"
          }`}
        >
          Your Balance: {balance || 0}
        </Text>
        <FormControl marginBottom="1rem" isRequired>
          <FormHelperText
            className={`${namLoading && "animate-pulse"} ${
              !name && "text-slate-400"
            }`}
            marginY={".5rem"}
          >
            Pass in amount and mint {feltToString(name)} token
          </FormHelperText>
          <FormLabel fontWeight={600}>Mint Token</FormLabel>
          {loading ? (
            <p>loading....</p>
          ) : (
            <>
              <Input
                onChange={handleChange}
                marginY={"1rem"}
                type="text"
                name="address"
                placeholder="recipient"
                required
                value={recipient}
              />
              <Input
                onChange={handleChange}
                type="number"
                name="amount"
                placeholder="amount"
                required
                value={amount}
              />
              <Button onClick={handleMint as any} marginY=".5rem">
                MINT TOKEN
              </Button>
            </>
          )}
        </FormControl>
        <VStack>
          <FormControl isRequired>
            <FormLabel marginY=".5rem">Transfer Token</FormLabel>
            <Input
              onChange={handleChange}
              name="receiver"
              type="text"
              value={receiver}
              placeholder="address"
            />
          </FormControl>

          <FormControl>
            <FormHelperText>Amount of token to transfer</FormHelperText>
            <Input
              onChange={handleChange}
              name="tokenAmount"
              type="number"
              placeholder="amount out"
              value={token}
              isRequired
            />
            <Button
              onClick={handleTransfer as any}
              marginY=".5rem"
            >
              TRANSFER TOKEN
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}
