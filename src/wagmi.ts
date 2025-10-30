import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zenChain
} from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'ZenBoost Platform',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
  chains: [mainnet, polygon, optimism, arbitrum, base, zenChain],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [zenChain.id]: http('https://rpc.zenchain.com/')
  }
});