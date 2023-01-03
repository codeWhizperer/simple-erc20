import { useContract } from '@starknet-react/core'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { address } from '../web3/constant'
import tokenABi from "../web3/abi.json"
import Layout from '../Layout/layout'
export default function Home() {
   const {contract} =  useContract({abi:tokenABi,address:address})
   console.log("contract:", contract)
  return (
    <Layout>
<h1>Text Align Center!</h1>
    </Layout>
  )
}
