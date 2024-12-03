import { createAppKit } from '@reown/appkit/react'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'


import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const chains = [mainnet] as const
const projectId = import.meta.env.VITE_WEB3_MODAL_PROJECT_ID as string;

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

// 3. Create modal
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [mainnet],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
