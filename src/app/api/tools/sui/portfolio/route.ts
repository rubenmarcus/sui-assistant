import { NextResponse } from 'next/server';
import { getSuiClient } from '../client';
import type { Balance } from '@mysten/sui/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const network = (searchParams.get('network') as 'mainnet' | 'testnet') || 'mainnet';

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const client = getSuiClient(network);

    // Get all balances for the address
    const balances = await client.getAllBalances({
      owner: address,
    });

    // Get owned objects
    const objects = await client.getOwnedObjects({
      owner: address,
      options: {
        showType: true,
        showContent: true,
        showDisplay: true,
      },
    });

    // Calculate total value (in SUI)
    const totalValue = balances.reduce((sum: number, balance: Balance) => {
      return sum + Number(balance.totalBalance);
    }, 0);

    return NextResponse.json({
      address,
      totalValue: totalValue.toString(),
      assets: balances.map((balance: Balance) => ({
        type: balance.coinType,
        balance: balance.totalBalance.toString(),
        value: balance.totalBalance.toString(), // In SUI
      })),
      objects: objects.data,
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio information' },
      { status: 500 }
    );
  }
}