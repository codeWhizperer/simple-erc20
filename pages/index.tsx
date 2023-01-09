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
import { feltToString, provider, stringToFelt } from "../web3/helper";
import BigNumber from "bignumber.js";
import { useTokenContract } from "../web3/hooks/useGetContract";
import { useEffect, useState } from "react";
import Header from "../common/Header/Header";
import { connect } from "get-starknet";
import { Contract, Signer } from "starknet";
import abi from "../web3/abi.json";
import { address as contractAddress } from "../web3/constant";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  let [recipient, setRecipient] = useState<string>("");
  let [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [connected, setConnected] = useState<any>(false);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [token, setToken] = useState("");
  const [balance, setBalance] = useState("");

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

  const ERC_TOKEN = new Contract(abi, contractAddress, provider);

  const fetchName = async () => {
    const tokenName = await ERC_TOKEN.name();
    const bigName = new BigNumber(tokenName.toString());
    const formatName = feltToString(bigName);
    setName(formatName);
  };

  const fetchBalance = async () => {
    const balance = await ERC_TOKEN.balanceOf(address.toString());
    console.log("balance:",balance[0]?.low?.words?.[0]);
    const bigBal = new BigNumber(balance[0]?.low);
    setBalance(bigBal?.toString());
  };

  const reset = () => {
    setRecipient("");
    setAmount("");
  };
  const resetTransfer = () => {
    setReceiver("");
    setToken("");
  };

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

  const mintToken = async () => {
    if (!recipient || !amount) return alert("input fields cannot be empty!");
    try {
      const ERC_TOKEN = new Contract(
        abi,
        contractAddress,
        window.starknet?.account
      );

      const txn = await ERC_TOKEN.mint(recipient, [amount, 0]);
      setLoading(true);
      if (!txn.transaction_hash) return setLoading(false);
      reset();
      fetchBalance();
      alert(txn.transaction_hash);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const transferToken = async () => {
    if (!receiver || !token) return alert("input fields cannot be empty!");
    try {
      const ERC_TOKEN = new Contract(
        abi,
        contractAddress,
        window.starknet?.account
      );

      const txn = await ERC_TOKEN.transfer(receiver, [token, 0]);
      setLoading(true);
      if (!txn.transaction_hash) return setLoading(false);
      resetTransfer();
      fetchBalance();
      alert(txn.transaction_hash);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };


  useEffect(() => {
    handleConnect();
    fetchName();
    fetchBalance();
  }, [address, connected]);

  return (
    <>
      <Header
        address={address}
        connected={connected}
        handleConnect={handleConnect}
      />
      <Container marginY={"2rem"} maxW="container.lg" color="#262626">
        <Text >Your Balance: {`${balance} ${name}`}</Text>
        <FormControl marginBottom="1rem" isRequired>
          <FormHelperText marginY={".5rem"}>
            Pass in amount and mint {name} token
          </FormHelperText>
          <FormLabel fontWeight={600}>Mint Token</FormLabel>
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
          <Button
            bg={`${loading ? `tomato` : `orange`}`}
            onClick={mintToken}
            disabled={loading === true}
            marginY=".5rem"
          >
            MINT TOKEN
          </Button>
        </FormControl>
        <VStack>
          <FormControl isRequired>
            <FormLabel marginY=".5rem">Transfer Token</FormLabel>
            <Input
              onChange={handleChange}
              name="receiver"
              type="text"
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
              isRequired
            />
            <Button
              onClick={transferToken}
              bg={`${loading ? `tomato` : `orange`}`}
              disabled={loading === true}
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
