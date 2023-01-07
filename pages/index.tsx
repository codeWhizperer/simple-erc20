import Layout from "../Layout/layout";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { feltToString, stringToFelt } from "../web3/helper";
import BigNumber from "bignumber.js";
import { useTokenContract } from "../web3/hooks/useGetContract";
import { useEffect, useState } from "react";


export default function Home() {
  const { tokenName, token, mintToken, contract } = useTokenContract();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    tokenName();
  }, []);

  // const DECIMAL = BigNumber("1000000000000000000");
  // // Token Decimal big number representaion using the BN.JS library
  // const DECIMAL_USING_BNJS = new BigNumber("1000000000000000000");

  const mintTokenHandler = async () => {
    let tokenAmount = new BigNumber(amount);
    let receiver = stringToFelt(recipient);
    await mintToken(
      receiver,
      tokenAmount,
      async (res:any) => {
        if (!res.hash) return;;
        const txn = res.wait();
        console.log(txn);
      }
    );
  };

  return (
    <Layout>
      <FormControl marginBottom="1rem" isRequired>
        <FormHelperText marginY={".5rem"}>
          Pass in amount and mint {`${token}`} token
        </FormHelperText>
        <FormLabel fontWeight={600}>Mint Token</FormLabel>
        <Input
          onChange={(e) => setRecipient(e.target.value)}
          marginY={"1rem"}
          type="text"
          placeholder="recipient"
        />
        <Input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="amount"
        />
        <Button onClick={mintTokenHandler} marginY=".5rem">
          MINT TOKEN
        </Button>
      </FormControl>
      <VStack>
        <FormControl marginBottom="1rem" isRequired>
          <FormLabel marginY=".5rem">Transfer Token</FormLabel>
          <Input type="text" placeholder="address" />
        </FormControl>

        <FormControl>
          <FormHelperText>Amount of token to transfer</FormHelperText>
          <Input type="number" placeholder="amount out" isRequired />
          <Button marginY=".5rem">TRANSFER TOKEN</Button>
        </FormControl>
      </VStack>

      <VStack>
        <FormControl marginBottom="1rem" isRequired>
          <FormHelperText>Enter spender Address</FormHelperText>
          <Input type="number" placeholder="amount out" isRequired />
        </FormControl>

        <FormControl isRequired>
          <FormLabel marginY=".5rem"> Token</FormLabel>
          <Input type="text" placeholder="address" />
          <Button marginY={".5rem"}>APPROVE TOKEN</Button>
        </FormControl>
      </VStack>
    </Layout>
  );
}
