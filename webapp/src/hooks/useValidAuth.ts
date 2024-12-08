import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getMe } from "../client/queries/public";
import { useEffect, useMemo } from "react";

export const useValidAuth = () => {
  const acc = useAccount();
  const { data: me, error, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  });
  useEffect(() => {
    if (!acc.isConnected) {
      localStorage.removeItem('token');
      refetch().then(() => {
        console.log('Disconnected');
      })
      .catch(() => {
        console.log('Disconnected');
      });
    }
  }, [acc.isConnected]);
  return useMemo(() => {
    if (error) {
      return false;
    }
    if (!me) {
      return false;
    }
    if (!acc.isConnected) {
      return false;
    }
    return true
  }, [error, me, acc]);
};
