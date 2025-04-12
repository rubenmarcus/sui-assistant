import { NextResponse } from 'next/server';
import { getSuiClient } from '../client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const network = (searchParams.get('network') as 'mainnet' | 'testnet') || 'mainnet';

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const client = getSuiClient(network);

    // Get balance
    const balance = await client.getBalance({
      owner: address,
      coinType: '0x2::sui::SUI',
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

    // Get transaction count
    const transactions = await client.queryTransactionBlocks({
      filter: {
        FromAddress: address,
      },
      options: {
        showEffects: true,
      },
    });

    return NextResponse.json({
      address,
      balance: balance.totalBalance.toString(),
      objects: objects.data,
      transactions: transactions.data.length.toString(),
    });
  } catch (error) {
    console.error('Error fetching address info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch address information' },
      { status: 500 }
    );
  }
}