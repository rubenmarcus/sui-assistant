import { NextResponse } from 'next/server';

export async function GET() {
  const pluginData = {
    openapi: '3.0.0',
    info: {
      title: 'Sui Explorer',
      description: 'API for retrieving and analyzing Sui blockchain data',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://sui-explorer.vercel.app',
      },
    ],
    'x-mb': {
      'account-id': '0x635cb127b5e2bf2e6d4af9567d49d34e08d2981b4d305f98a5c5c9314a672b7a',
      assistant: {
        name: 'Sui Explorer',
        image:
        "https://sui-explorer.vercel.app/logo.png",
        description:
          "An explorer assistant that helps you discover and analyze the Sui blockchain, providing insights into addresses, transactions, objects, and network statistics.",
        instructions:
          "You are a Sui blockchain explorer assistant. Your role is to help users discover and understand the Sui blockchain ecosystem. You can explore addresses, analyze transactions, examine objects, and provide insights into network statistics. When users ask about Sui-related topics, use the available tools to gather and present information in a clear and organized way, helping them understand the blockchain's state and activity.",
        tools: [
          { type: 'get-sui-address-info' },
          { type: 'get-sui-transactions' },
          { type: 'get-sui-portfolio' },
          { type: 'get-sui-stats' },
          { type: 'get-sui-objects' },
          { type: 'generate-sui-tx' },
        ],
      },
    },
    paths: {
      '/api/tools/sui/address-info': {
        get: {
          summary: 'Get Sui address information',
          description: 'Retrieves detailed information about a Sui address',
          operationId: 'get-sui-address-info',
          parameters: [
            {
              name: 'address',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The Sui address to query',
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      address: {
                        type: 'string',
                        description: 'The queried Sui address',
                      },
                      balance: {
                        type: 'string',
                        description: 'The address balance in SUI',
                      },
                      objects: {
                        type: 'array',
                        description: 'List of objects owned by the address',
                        items: {
                          type: 'object',
                        },
                      },
                      transactions: {
                        type: 'integer',
                        description: 'Number of transactions',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/sui/transactions': {
        get: {
          summary: 'Get Sui transaction history',
          description: 'Retrieves transaction history for a Sui address',
          operationId: 'get-sui-transactions',
          parameters: [
            {
              name: 'address',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The Sui address to query',
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: {
                type: 'integer',
                default: 10,
              },
              description: 'Number of transactions to return',
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      transactions: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            digest: {
                              type: 'string',
                              description: 'Transaction digest',
                            },
                            timestamp: {
                              type: 'string',
                              description: 'Transaction timestamp',
                            },
                            type: {
                              type: 'string',
                              description: 'Transaction type',
                            },
                            status: {
                              type: 'string',
                              description: 'Transaction status',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/sui/portfolio': {
        get: {
          summary: 'Get Sui portfolio',
          description: 'Retrieves portfolio information for a Sui address',
          operationId: 'get-sui-portfolio',
          parameters: [
            {
              name: 'address',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The Sui address to query',
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      address: {
                        type: 'string',
                        description: 'The queried Sui address',
                      },
                      totalValue: {
                        type: 'string',
                        description: 'Total portfolio value in SUI',
                      },
                      assets: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              description: 'Asset type',
                            },
                            balance: {
                              type: 'string',
                              description: 'Asset balance',
                            },
                            value: {
                              type: 'string',
                              description: 'Asset value in SUI',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/sui/stats': {
        get: {
          summary: 'Get Sui blockchain statistics',
          description: 'Retrieves current Sui blockchain statistics',
          operationId: 'get-sui-stats',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      totalTransactions: {
                        type: 'integer',
                        description: 'Total number of transactions',
                      },
                      activeValidators: {
                        type: 'integer',
                        description: 'Number of active validators',
                      },
                      totalSupply: {
                        type: 'string',
                        description: 'Total SUI supply',
                      },
                      averageBlockTime: {
                        type: 'string',
                        description: 'Average block time',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/tools/sui/objects': {
        get: {
          summary: 'Get Sui objects',
          description: 'Retrieves objects owned by a Sui address',
          operationId: 'get-sui-objects',
          parameters: [
            {
              name: 'address',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The Sui address to query',
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      objects: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            objectId: {
                              type: 'string',
                              description: 'Object ID',
                            },
                            type: {
                              type: 'string',
                              description: 'Object type',
                            },
                            version: {
                              type: 'integer',
                              description: 'Object version',
                            },
                            digest: {
                              type: 'string',
                              description: 'Object digest',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(pluginData);
}
