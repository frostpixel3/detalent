/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC } from 'react'
import { getEthersProvider } from '../utils/ethers';
import { wagmiConfig } from '../wagmiConfig';
import { RequestNetwork, Types, Utils } from "@requestnetwork/request-client.js"
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { useAccount, useWalletClient } from 'wagmi';
import { providers } from 'ethers';
import { payRequest } from "@requestnetwork/payment-processor";
import { useEthersSigner, useEthersV5Signer } from '../hooks/useEthersV5Signer';

export interface CreateRequestButtonProps {

}

export const CreateRequestButton: FC<CreateRequestButtonProps> = (props) => {
  const { data: walletClient } = useWalletClient();
  const web3SignatureProvider = new Web3SignatureProvider(walletClient ?? new providers.Web3Provider(window.ethereum));
  const account = useAccount();
  const signer = useEthersSigner({ chainId: 1 });

  const request = async () => {

    const requestClient = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3SignatureProvider,
    });

    const payeeIdentity = account.address;
    const payerIdentity = account.address;
    const paymentRecipient = payeeIdentity;
    const feeRecipient = '0x0000000000000000000000000000000000000000';
    const requestRes = await requestClient.createRequest({
      requestInfo: {

        // The currency in which the request is denominated
        currency: {
          type: Types.RequestLogic.CURRENCY.ERC20,
          value: '0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C',
          // value: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
          network: 'sepolia',
        },

        // The expected amount as a string, in parsed units, respecting `decimals`
        // Consider using `parseUnits()` from ethers or viem
        // expectedAmount: '1000000000000000000',
        expectedAmount: '1',

        // The payee identity. Not necessarily the same as the payment recipient.
        payee: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: payeeIdentity,
        },

        // The payer identity. If omitted, any identity can pay the request.
        payer: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: payerIdentity,
        },

        // The request creation timestamp.
        timestamp: Utils.getCurrentTimestampInSecond(),
      },

      // The paymentNetwork is the method of payment and related details.
      paymentNetwork: {
        id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
        parameters: {
          paymentNetworkName: 'sepolia',
          paymentAddress: payeeIdentity,
          feeAddress: feeRecipient,
          feeAmount: '0',
        },
      },

      // The contentData can contain anything.
      // Consider using rnf_invoice format from @requestnetwork/data-format
      contentData: {
        reason: '🍕',
        dueDate: '2023.06.16',
      },

      // The identity that signs the request, either payee or payer identity.
      signer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeIdentity,
      },
    });
    console.log(requestRes);

    const confirmedRequestData = await requestRes.waitForConfirmation();

    console.log(confirmedRequestData);

    const req = await requestClient.fromRequestId(confirmedRequestData.requestId);
    const reqData = req.getData();
    // console.log(reqData);
    payRequest(reqData, signer);
  }
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={request}
      >Create Request</button>
    </div>
  )
}
