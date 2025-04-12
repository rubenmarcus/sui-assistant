import { NextResponse } from 'next/server';
import { getSuiClient } from '../client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const network = (searchParams.get('network') as 'mainnet' | 'testnet') || 'mainnet';

    const client = getSuiClient(network);

    // Get latest checkpoint
    const latestCheckpoint = await client.getLatestCheckpointSequenceNumber();

    // Get total transactions
    const totalTransactions = await client.getTotalTransactionBlocks();

    // Get validators
    const validators = await client.getValidatorsApy();

    // Get reference gas price
    const referenceGasPrice = await client.getReferenceGasPrice();

    // Get total supply
    const totalSupply = await client.getTotalSupply({
      coinType: '0x2::sui::SUI',
    });

    return NextResponse.json({
      totalTransactions: totalTransactions.toString(),
      activeValidators: validators.apys.length,
      totalSupply: totalSupply.value.toString(),
      referenceGasPrice: referenceGasPrice.toString(),
      latestCheckpoint: latestCheckpoint.toString(),
    });
  } catch (error) {
    console.error('Error fetching blockchain stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blockchain statistics' },
      { status: 500 }
    );
  }
}