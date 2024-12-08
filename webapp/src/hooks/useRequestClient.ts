/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { providers } from "ethers";
import { useWalletClient } from "wagmi";
import { useMemo } from "react";

const NODE_CONNECTION_BASE_URL = "https://sepolia.gateway.request.network/";

export const useRequestClient = () => {
  const { data: walletClient } = useWalletClient();

  const requestClient = useMemo(() => {
    const web3SignatureProvider = new Web3SignatureProvider(walletClient ?? new providers.Web3Provider((window as any).ethereum));

    return new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: NODE_CONNECTION_BASE_URL,
      },
      signatureProvider: web3SignatureProvider,
    });
  }, [walletClient]);

  return requestClient;
}
