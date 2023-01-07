import { useMemo, useState } from "react";
import { getContract } from "./getContract";
import abi from "../abi.json";
import { Provider } from "starknet";
import { feltToString, stringToFelt } from "../helper";
import  BigNumber  from "bignumber.js"


const DECIMAL = BigNumber('1000000000000000000')
// Token Decimal big number representaion using the BN.JS library
const DECIMAL_USING_BNJS = new BigNumber('1000000000000000000')
// Zero as big number using the BN.JS library
const ZERO_MUL_DECIMAL_IN_BNJS = new BigNumber(0).multipliedBy(DECIMAL_USING_BNJS)

export const useTokenContract = () => {
  const provider = new Provider({
    sequencer: {
      network: "goerli-alpha",
    },
  });
  let [token, setToken] = useState("")
  const contract = useMemo(() => getContract(abi, provider), []);

// fetch token name
  const tokenName = async() =>{
    let res = await contract.name()
    let big = new BigNumber(res.toString())
    let format = feltToString(big)
    setToken(format)
  }

  // mint token
  const mintToken = async(recipient:any, amount:any, res:any) =>{
    await contract.mint(recipient,[amount,ZERO_MUL_DECIMAL_IN_BNJS]).then(res)
  }

  return {
    contract,
    tokenName,
    token,
    mintToken
  };
};
