# Sui Assistant

A powerful AI assistant specialized in providing detailed information and analysis about the Sui blockchain. This assistant can help users understand and interact with the Sui ecosystem through various tools and endpoints.

## Features

- 🔍 Address Information: Get detailed information about any Sui address
- 📊 Transaction History: View and analyze transaction history
- 💼 Portfolio Tracking: Monitor asset holdings and portfolio value
- 📈 Blockchain Statistics: Access real-time Sui blockchain metrics
- 🏗️ Object Management: Interact with Sui objects
- 💸 Transaction Generation: Create and prepare Sui transactions

## Available Tools

### 1. Address Information
- Endpoint: `/api/tools/sui/address-info`
- Retrieves detailed information about a Sui address including:
  - Address balance
  - Owned objects
  - Transaction count
  - Other address-specific data

### 2. Transaction History
- Endpoint: `/api/tools/sui/transactions`
- Features:
  - View transaction history for any address
  - Filter by transaction count
  - Get detailed transaction information including:
    - Transaction digest
    - Timestamp
    - Transaction type
    - Status

### 3. Portfolio Tracking
- Endpoint: `/api/tools/sui/portfolio`
- Provides comprehensive portfolio information:
  - Total portfolio value in SUI
  - Detailed asset breakdown
  - Individual asset balances and values

### 4. Blockchain Statistics
- Endpoint: `/api/tools/sui/stats`
- Access real-time Sui blockchain metrics:
  - Total transaction count
  - Active validators
  - Total SUI supply
  - Average block time

### 5. Object Management
- Endpoint: `/api/tools/sui/objects`
- Interact with Sui objects:
  - View object details
  - Track object ownership
  - Monitor object states

### 6. Transaction Generation
- Endpoint: `/api/tools/sui/generate-tx`
- Create and prepare Sui transactions:
  - Generate transaction payloads
  - Prepare transaction data
  - Format transaction parameters

## Quick Start

1. Clone this repository
2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
```bash
# Create a .env file with the following variables
ACCOUNT_ID='your-account-id'
PLUGIN_URL='your-plugin-url'
```

4. Start the development server:
```bash
pnpm run dev
```

## Usage Examples

### Get Address Information
```bash
curl "http://localhost:3000/api/tools/sui/address-info?address=0x..."
```

### View Transaction History
```bash
curl "http://localhost:3000/api/tools/sui/transactions?address=0x...&limit=10"
```

### Check Portfolio
```bash
curl "http://localhost:3000/api/tools/sui/portfolio?address=0x..."
```

### Get Blockchain Stats
```bash
curl "http://localhost:3000/api/tools/sui/stats"
```

## Development

### Building the Project
```bash
pnpm run build
```

### Running Tests
```bash
pnpm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
