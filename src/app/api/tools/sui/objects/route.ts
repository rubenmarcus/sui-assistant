import { NextResponse } from 'next/server';
import { getSuiClient } from '../client';
import type { SuiObjectResponse } from '@mysten/sui/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const network = (searchParams.get('network') as 'mainnet' | 'testnet') || 'mainnet';

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const client = getSuiClient(network);

    const objects = await client.getOwnedObjects({
      owner: address,
      options: {
        showType: true,
        showContent: true,
        showDisplay: true,
      },
    });

    return NextResponse.json({
      objects: objects.data.map((obj: SuiObjectResponse) => ({
        objectId: obj.data?.objectId,
        type: obj.data?.type,
        version: obj.data?.version?.toString(),
        digest: obj.data?.digest,
        display: obj.data?.display,
        content: obj.data?.content,
      })),
    });
  } catch (error) {
    console.error('Error fetching objects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch objects' },
      { status: 500 }
    );
  }
}