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
import { feltToString, provider } from "../web3/helper";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import Header from "../common/Header/Header";
import { connect } from "get-starknet";
import { Contract } from "starknet";
import abi from "../web3/abi.json";
import { address as contractAddress } from "../web3/constant";
import {
  useAccount,
  useContract,
  useStarknetCall,
  useStarknetExecute,
} from "@starknet-react/core";

// export default function Home() {
//   let [recipient, setRecipient] = useState<string>("");
//   let [amount, setAmount] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [connected, setConnected] = useState<any>(false);
//   const [name, setName] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [receiver, setReceiver] = useState("");
//   const [token, setToken] = useState("");
//   const [balance, setBalance] = useState("");
//   const [transferSuccess, setTransferSuccess] = useState(false)
//   const [error, setError] = useState(null)

//   const handleConnect = async () => {
//     const res = await connect();
//     if (!res?.isConnected) {
//       await res?.enable({ starknetVersion: "v4" });
//       setAddress(res?.selectedAddress || "");
//       setConnected(res?.isConnected);
//     } else {
//       await res?.enable({ starknetVersion: "v4" });
//       setAddress(res?.selectedAddress || "");
//       setConnected(res?.isConnected);
//     }
//   };

//   const ERC_TOKEN = new Contract(abi, contractAddress, provider);

//   const fetchName = async () => {
//     const tokenName = await ERC_TOKEN.name();
//     const bigName = new BigNumber(tokenName.toString());
//     const formatName = feltToString(bigName);
//     setName(formatName);
//   };

//   const fetchBalance = async () => {
//     const balance = await ERC_TOKEN.balanceOf(address.toString());
//     const bigBal = new BigNumber(balance[0]?.low);
//     setBalance(bigBal?.toString());
//   };

//   const reset = () => {
//     setRecipient("");
//     setAmount("");
//   };
//   const handleChange = ({ target }: any) => {
//     const elementName = target.name;
//     const value = target.value;

//     switch (elementName) {
//       case "address":
//         if (value === "") return setRecipient("");
//         else if (value) return setRecipient(value);
//       case "amount":
//         if (value === "") return setAmount("");
//         else if (value) return setAmount(value);
//       case "receiver":
//         if (value === "") return setReceiver("");
//         else if (value) return setReceiver(value);
//       case "tokenAmount":
//         if (value === "") return setToken("");
//         else if (value) return setToken(value);
//     }
//   };

//   const mintToken = async () => {
//     if (!recipient || !amount) return alert("input fields cannot be empty!");
//     try {
//       const ERC_TOKEN = new Contract(
//         abi,
//         contractAddress,
//         window.starknet?.account
//       );

//       const txn = await ERC_TOKEN.mint(recipient, [amount, 0]);
//       setLoading(true);
//       if (!txn.transaction_hash) return setLoading(false);
//       setTimeout(() => {
//         reset()
//         fetchBalance();
//       }, 2000);
//       alert(txn.transaction_hash);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       throw error;
//     }
//   };

//   const transferToken = async () => {
//     if (!receiver || !token) return alert("input fields cannot be empty!");
//     try {
//       setError(null)
//       setLoading(true)
//       const ERC_TOKEN = new Contract(
//         abi,
//         contractAddress,
//         window.starknet?.account
//       );

//       const txn = await ERC_TOKEN.transfer(receiver, [token, 0]);
//       console.log(txn)
//       if (!txn.transaction_hash){
//         setLoading(false);
//         throw new Error("Transfer failed!")
//       }
//       setTimeout(() => {
//         setReceiver('');
//         setToken('');
//         fetchBalance();
//       }, 2000);
//       setTransferSuccess(true)
//       setLoading(false)
//     } catch (error:any) {
//       setLoading(false);
//       setError(error?.message)
//     }
//   };

//   useEffect(() => {
//     fetchBalance()
//     handleConnect();
//     fetchName();
//   }, [address]);

//   return (
//     <>
//       <Header
//         address={address}
//         connected={connected}
//         handleConnect={handleConnect}
//       />

//       {error && <p>{error}</p>}
//       {loading && <p>Loading...</p>}
//       <Container marginY={"2rem"} maxW="container.lg" color="#262626">
//         <Text >Your Balance: {`${balance} ${name}`}</Text>
//         <FormControl marginBottom="1rem" isRequired>
//           <FormHelperText marginY={".5rem"}>
//             Pass in amount and mint {name} token
//           </FormHelperText>
//           <FormLabel fontWeight={600}>Mint Token</FormLabel>
//           <Input
//             onChange={handleChange}
//             marginY={"1rem"}
//             type="text"
//             name="address"
//             placeholder="recipient"
//             required
//             value={recipient}
//           />
//           <Input
//             onChange={handleChange}
//             type="number"
//             name="amount"
//             placeholder="amount"
//             required
//             value={amount}
//           />
//           <Button
//             bg={`${loading ? `tomato` : `orange`}`}
//             onClick={mintToken}
//             disabled={loading === true}
//             marginY=".5rem"
//           >
//             MINT TOKEN
//           </Button>
//         </FormControl>
//         <VStack>
//           <FormControl isRequired>
//             <FormLabel marginY=".5rem">Transfer Token</FormLabel>
//             <Input
//               onChange={handleChange}
//               name="receiver"
//               type="text"
//               value={receiver}
//               placeholder="address"
//             />
//           </FormControl>

//           <FormControl>
//             <FormHelperText>Amount of token to transfer</FormHelperText>
//             <Input
//               onChange={handleChange}
//               name="tokenAmount"
//               type="number"
//               placeholder="amount out"
//               value={token}
//               isRequired
//             />
//             <Button
//               onClick={transferToken}
//               bg={`${loading ? `tomato` : `orange`}`}
//               disabled={loading === true}
//               marginY=".5rem"
//             >
//               TRANSFER TOKEN
//             </Button>
//           </FormControl>
//         </VStack>
//       </Container>
//     </>
//   );
// }

export default function Home() {
  let [recipient, setRecipient] = useState<string>("");
  let [amount, setAmount] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  const [connected, setConnected] = useState<any>(false);
  // const [name, setName] = useState<string>("");
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
