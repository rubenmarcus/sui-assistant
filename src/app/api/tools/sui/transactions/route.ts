import { NextResponse } from 'next/server';
import { getSuiClient } from '../client';
import type { SuiTransactionBlockResponse } from '@mysten/sui/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const network = (searchParams.get('network') as 'mainnet' | 'testnet') || 'mainnet';

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const client = getSuiClient(network);

    const transactions = await client.queryTransactionBlocks({
      filter: {
        FromAddress: address,
      },
      options: {
        showEffects: true,
        showBalanceChanges: true,
        showInput: true,
      },
      limit,
    });

    return NextResponse.json({
      transactions: transactions.data.map((tx: SuiTransactionBlockResponse) => ({
        digest: tx.digest,
        timestamp: tx.timestampMs?.toString(),
        type: tx.transaction?.data.transaction.kind,
        status: tx.effects?.status.status,
        balanceChanges: tx.balanceChanges?.map(change => ({
          ...change,
          amount: change.amount?.toString(),
        })),
      })),
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}