/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useEffect, useState } from "react";
import { DeployForm } from "../components/forms/DeployForm";
import { useForm } from "react-hook-form";

import {
  someExampleFactoryAbi,
  useWriteSomeExampleFactoryDeployContract,
} from "../generated";
import { decodeEventLog } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FACTORY } from "../consts/factory";
import { PATHS } from "../consts/paths";

export interface DeployPageProps {}

export const DeployPage: FC<DeployPageProps> = () => {
  const navigate = useNavigate();
  const acc = useAccount();
  const [loading, setLoading] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState<string>();
  const form = useForm({});
  const { writeContractAsync, data } = useWriteSomeExampleFactoryDeployContract();
  const { data: txData } = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    if (txData && txData?.logs) {
      const logs = txData.logs;
      const topics = decodeEventLog({
        abi: someExampleFactoryAbi,
        data: logs[0].data,
        topics: logs[0].topics,
      });
      setLoading(false);
      toast.success('Deployment successful');
      // TODO: Store the deployed address in a state
      setDeployedAddress(topics.args.newContractAddress);
      // navigate(PATHS.app);
    }
  }, [navigate, txData]);
  const onSubmit = async () => {
    setLoading(true);
    await writeContractAsync({
      address: FACTORY.address as `0x${string}`
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {acc.isConnected ? (
        <div>
          <DeployForm form={form} onSubmit={onSubmit} loading={loading} />
          {deployedAddress && (
            <div className="mt-4">Deployed Address: {deployedAddress}</div>
          )}
        </div>
      ) : (
        <>
          <w3m-button />
        </>
      )}
    </div>
  );
};
