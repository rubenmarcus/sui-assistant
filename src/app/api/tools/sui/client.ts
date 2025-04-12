import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

const SUI_NETWORKS = {
  mainnet: getFullnodeUrl('mainnet'),
  testnet: getFullnodeUrl('testnet'),
};

export function getSuiClient(network: 'mainnet' | 'testnet' = 'mainnet'): SuiClient {
  return new SuiClient({ url: SUI_NETWORKS[network] });
}

export type SuiNetwork = 'mainnet' | 'testnet';