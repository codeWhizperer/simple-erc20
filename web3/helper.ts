import {Buffer} from 'buffer'
import { Contract, Provider } from "starknet";
export const shortenAddress = (address:string) =>{
    if(!address) return null
    return `${address.substring(0,6)}...${address.substring(address.length -4, address.length)}`

}


export function feltToString(felt:any) {
    const newStrB = Buffer.from(felt?.toString(16), 'hex')
    return newStrB.toString()
}
  
export function stringToFelt(str:any) {
    return "0x" + Buffer.from(str)?.toString('hex')
}

export const provider = new Provider({
    sequencer: {
      network: "goerli-alpha",
    },
  });

