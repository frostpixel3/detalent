import { api } from "../api"

export const generateNonceMessage = async ({ address }: { address: string }) => {
  const res = await api.post<{ message: string }>('/users/auth/init', { address });
  return res.data.message;
}

export const verifyNonceMessage = async ({ address, signedMessage }: { address: string, signedMessage: string }) => {
  const res = await api.post<{ token: string }>('/users/auth/verify', { address, signedMessage });
  return res.data.token;
}
