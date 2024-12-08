import { useMutation, useQuery } from '@tanstack/react-query';
import React, { FC } from 'react'
import { useAccount, useSignMessage } from 'wagmi';
import { generateNonceMessage, verifyNonceMessage } from '../client/mutations/auth';
import { toast } from 'react-toastify';
import { getMe } from '../client/queries/public';
import classNames from 'classnames';
import { useAppKit } from '@reown/appkit/react';

export interface Web3ConnectBoxProps {

}

export const Web3ConnectBox: FC<Web3ConnectBoxProps> = (props) => {
  const { data: me, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
    enabled: false,
  });
  const acc = useAccount();
  const { open } = useAppKit();
  const verifyNonceMessageMutation = useMutation({
    mutationFn: verifyNonceMessage,
  });
  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess: async (signedMessage) => {
        if (!acc.address) {
          return;
        }
        try {
          const token = await verifyNonceMessageMutation.mutateAsync({ address: acc.address, signedMessage });
          localStorage.setItem('token', token);
          await refetch();
        } catch (error) {
          toast.error('Auth Failed - Failed to verify signature');
        }
      }
    }
  });
  const generateNonceMutation = useMutation({
    mutationFn: generateNonceMessage,
  });
  const onClick = async () => {
    if (!acc.address) {
      return;
    }
    const message = await generateNonceMutation.mutateAsync({ address: acc.address });
    signMessage({ message });
  }
  return (
    <div className="bg-white border max-w-screen-sm w-full rounded-lg">
      <div className="p-8">
        <ul className="steps w-full">
          <li className={classNames(
            'step',
            { 'step-primary': acc.isConnected }
          )}>Connect Wallet</li>
          <li className={classNames(
            'step',
            {
              'step-primary': acc.isConnected && me?.id,
            }
          )}>Auth</li>
        </ul>
      </div>
      <div className="p-8 border-t flex justify-center">
        {acc.isConnected ? (
          <div>
            <button className="btn btn-primary" onClick={onClick}>
              Auth (Signature Required)
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => open({ view: 'Connect' })}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}
