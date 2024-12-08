/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types, Utils } from "@requestnetwork/request-client.js";
import { useRequestClient } from "./useRequestClient";
import { ERC20 } from "../consts/erc20";
import { useState } from "react";

// TODO: Change those values after the Hackathon
const NETWORK_NAME = 'sepolia';

export const useCreatePaymentRequest = () => {
  const [loading, setLoading] = useState(false);
  const requestClient = useRequestClient();

  const _convertDueDateToRequestFormat = (dueDate: string) => {
    const [year, month, day] = dueDate.split('-');
    return `${day}.${month}.${year}`;
  }

  const request = async ({
    payeeAddress,
    payerAddress,
    amount,
    dueDate,
    feeRecipient = '0x0000000000000000000000000000000000000000',
    feeAmount = '0',
    reason = 'deTalent Invoice',
  }: {
    payeeAddress: string;
    payerAddress: string;
    amount: string;
    feeRecipient?: string;
    feeAmount?: string;
    reason: string;
    dueDate: string;
  }) => {
    const payeeIdentity = payeeAddress;
    const payerIdentity = payerAddress;
    setLoading(true);
    const requestRes = await requestClient.createRequest({
      requestInfo: {
        currency: {
          type: Types.RequestLogic.CURRENCY.ERC20,
          value: ERC20.address,
          network: NETWORK_NAME,
        },
        expectedAmount: amount,
        payee: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: payeeIdentity,
        },
        payer: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: payerIdentity,
        },
        timestamp: Utils.getCurrentTimestampInSecond(),
      },
      paymentNetwork: {
        id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
        parameters: {
          paymentNetworkName: NETWORK_NAME,
          paymentAddress: payeeIdentity,
          feeAddress: feeRecipient,
          feeAmount: feeAmount,
        },
      },
      contentData: {
        reason: reason,
        dueDate: _convertDueDateToRequestFormat(dueDate),
      },
      signer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeIdentity,
      },
    });
    const confirmedRequestData = await requestRes.waitForConfirmation();
    setLoading(false);
    return confirmedRequestData;
  }

  return {
    loading,
    request,
  }
}
