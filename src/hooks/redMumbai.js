import {useMemo} from "react";
import { useWeb3React } from "@web3-react/core";
import abiNft from "../config/web3/abiNft";


const {address, abi} = abiNft;


const redMumbai = () => {
  const {active,library,chainId } = useWeb3React()

  const mumbai = useMemo( () => {
  if (active) return new library.eth.Contract(abi,address[chainId]);
    }, [active,chainId,library?.eth?.Contract]);

    return mumbai
};

export default redMumbai;