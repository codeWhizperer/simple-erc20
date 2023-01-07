import { Contract } from "starknet"
import { address } from "../constant"


export const getContract = (abi:any, provider:any) =>{
    return new Contract(abi,address, provider)
}