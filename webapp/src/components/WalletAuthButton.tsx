/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { generateNonceMessage, verifyNonceMessage } from '../client/mutations/auth';
import { toast } from 'react-toastify';

export interface WalletAuthButtonProps {
  
}

export const WalletAuthButton: FC<WalletAuthButtonProps> = (props) => {
  const acc = useAccount();
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
  console.log(acc.isConnected);
  if (!acc.isConnected) {
    return <appkit-button />;
  }
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Connect Wallet
    </button>
  )
}
