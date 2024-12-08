import { payRequest } from "@requestnetwork/payment-processor";
import { useEthersSigner } from "./useEthersV5Signer";
import { useRequestClient } from "./useRequestClient";

export const usePayRequest = () => {
  const requestClient = useRequestClient();
  const signer = useEthersSigner();
  return async ({ requestId }: { requestId: string }) => {
    const req = await requestClient.fromRequestId(requestId);
    const reqData = req.getData();
    return payRequest(reqData, signer);
  }
}
