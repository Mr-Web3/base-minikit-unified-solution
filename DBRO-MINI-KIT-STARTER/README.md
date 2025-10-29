# Decentral Bros Mini App Starter Kit dApp / Mini App All In One Build

A complete starter template for Base mini apps with Farcaster integration, smart contract functionality, and responsive design. Connect your wallet and explore DeFi integrations with built-in staking functionality.

## 🚀 Complete Setup Guide

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Mr-Web3/base-minikit-unified-solution
cd DBRO-STAKING-MINI-APP

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy the environment template
cp env.template .env.local

# Edit .env.local with your configuration
nano .env.local  # or use your preferred editor
```

**Required Environment Variables:**

```bash
# Shared/OnchainKit variables
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=DBRO Mini Temp
NEXT_PUBLIC_URL=https://www.dbro.dev
NEXT_PUBLIC_ICON_URL=https://www.dbro.dev/newIcon.jpg
NEXT_PUBLIC_ONCHAINKIT_API_KEY=

# Frame metadata
FARCASTER_HEADER=
FARCASTER_PAYLOAD=
FARCASTER_SIGNATURE=
NEXT_PUBLIC_APP_ICON=https://www.dbro.dev/newIcon.jpg
# Optional Frame metadata items below
NEXT_PUBLIC_APP_SUBTITLE=Stake your DBRO earn BIG!.
NEXT_PUBLIC_APP_DESCRIPTION=Stake a max of 5M DBRO tokens, earn passively, high APY and access to exclusive utilites.
NEXT_PUBLIC_APP_SPLASH_IMAGE=https://www.dbro.dev/newSplash.png
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR="#000000"
NEXT_PUBLIC_APP_PRIMARY_CATEGORY=utility
NEXT_PUBLIC_APP_HERO_IMAGE=https://www.dbro.dev/newHero.png
NEXT_PUBLIC_APP_TAGLINE=Staking for the Bros
NEXT_PUBLIC_APP_OG_TITLE=DBRO Mini Temp Passive Income
NEXT_PUBLIC_APP_OG_DESCRIPTION=Passive income starts with staking DBRO, Turn idle DBRO into daily rewards.
NEXT_PUBLIC_APP_OG_IMAGE=https://www.dbro.dev/newHero.png

# Redis config
REDIS_URL=
REDIS_TOKEN=

#RPC's
NEXT_PUBLIC_BASE_URL=

# Paymaster Service URL (from Coinbase Developer Platform)
NEXT_PUBLIC_PAYMASTER_SERVICE_URL=
# Or use a proxy for better security
NEXT_PUBLIC_PAYMASTER_PROXY_SERVER_URL=

TALENT_PROTOCOL_API_KEY=
TALENT_WALLET=
```

### 3. Generate and Sign Manifest

```bash
# Generate your Farcaster manifest
npm run manifest:generate

# Sign your manifest with your Farcaster account
npm run manifest:sign
```

**Signing Process:**

1. The script will open https://farcaster.xyz/~/developers/new
2. Enter your domain exactly as configured in `NEXT_PUBLIC_URL`
3. Copy the generated account association values
4. Paste them when prompted by the script

### 4. Validate Configuration

```bash
# Validate your manifest and environment
npm run manifest:validate
```

### 5. Local Development

```bash
# Start the development server
npm run dev

# Your app will be available at http://localhost:3000
```

### 6. Testing with Ngrok (for Farcaster integration)

```bash
# Install ngrok globally (if not already installed)
npm install -g ngrok

# In a new terminal, expose your local server
ngrok http --url=help.ngrok.dev 3000

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Update your .env.local:
NEXT_PUBLIC_URL=abc123.ngrok.io

# Regenerate manifest with new URL
npm run manifest:generate
npm run manifest:sign
```

### 7. Test Your Manifest

```bash
# Test the manifest endpoint
curl https://your-ngrok-url.ngrok.io/.well-known/farcaster.json

# Or visit in browser:
# https://your-ngrok-url.ngrok.io/.well-known/farcaster.json
```

### 8. Deploy to Production

**Vercel (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Vercel deploy Staging
vercel

# Vercel Prod Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# Update NEXT_PUBLIC_URL to your production domain
```

### 9. Final Manifest Setup

After deployment, update your production environment:

```bash
# Update NEXT_PUBLIC_URL to your production domain
NEXT_PUBLIC_URL=your-production-domain.com

# Regenerate and sign manifest for production
npm run manifest:generate
npm run manifest:sign

# Validate everything
npm run manifest:validate
```

### 10. Verify Manifest

```bash
# Test your production manifest
curl https://your-production-domain.com/.well-known/farcaster.json

# Verify in Farcaster Developer Tools
# Visit: https://farcaster.xyz/~/developers/mini-apps/manifest
# Enter your domain and check validation
```

## 🔗 Smart Contract Integration

### 1. Contract Configuration

The project includes a complete smart contract integration system. Here's how to set up your contracts:

**File: `contracts/deployedContracts.ts`**

```typescript
import { Address } from "viem";

export const deployedContracts = {
  // Add your contract addresses here
  DBRO_TOKEN: "0x..." as Address,
  STAKING_CONTRACT: "0x..." as Address,
  REWARD_CONTRACT: "0x..." as Address,
} as const;
```

### 2. Adding Contract ABIs

**Step 1: Create ABI files**

```bash
# Create a new file for each contract ABI
mkdir -p contracts/abis
touch contracts/abis/DBRO_TOKEN.json
touch contracts/abis/STAKING_CONTRACT.json
```

**Step 2: Add your contract ABIs**

```typescript
// contracts/abis/DBRO_TOKEN.json
[
  {
    "inputs": [...],
    "name": "approve",
    "outputs": [...],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... rest of your ABI
]
```

**Step 3: Import and use in components**

```typescript
// In your React components
import { useContractRead, useContractWrite } from "wagmi";
import { deployedContracts } from "@/contracts/deployedContracts";
import DBRO_ABI from "@/contracts/abis/DBRO_TOKEN.json";

// Read contract data
const { data: balance } = useContractRead({
  address: deployedContracts.DBRO_TOKEN,
  abi: DBRO_ABI,
  functionName: "balanceOf",
  args: [userAddress],
});

// Write to contract
const { write: approve } = useContractWrite({
  address: deployedContracts.DBRO_TOKEN,
  abi: DBRO_ABI,
  functionName: "approve",
});
```

### 3. RPC Configuration

**Environment Variables:**

```bash
# Base RPC endpoints
NEXT_PUBLIC_BASE_URL=https://mainnet.base.org
# Or use a custom RPC provider
NEXT_PUBLIC_BASE_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

**Using Custom RPC:**

```typescript
// lib/contracts.ts
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

export const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_BASE_URL),
});
```

### 4. Transaction Handling with Toast Notifications

The project includes a comprehensive toast notification system for contract interactions:

**Basic Usage:**

```typescript
import Toast from "@/components/Toast";

const [toast, setToast] = useState<{
  message: string;
  type: "success" | "error" | "loading";
  transactionType?: "approve" | "stake" | "unstake" | "claim" | "unwrap";
} | null>(null);

// Show loading toast
setToast({
  message: "Approving tokens...",
  type: "loading",
  transactionType: "approve",
});

// Handle transaction success
const handleSuccess = () => {
  setToast({
    message: "Transaction successful!",
    type: "success",
    transactionType: "stake",
  });
};

// Handle transaction error
const handleError = (error: Error) => {
  setToast({
    message: `Transaction failed: ${error.message}`,
    type: "error",
    transactionType: "stake",
  });
};
```

**Toast Types Available:**

- `approve`: Token approval transactions
- `stake`: Staking transactions
- `unstake`: Unstaking transactions
- `claim`: Reward claiming transactions
- `unwrap`: Token unwrapping transactions

**Customizing Toast Duration:**

```typescript
<Toast
  message="Custom message"
  type="success"
  transactionType="stake"
  duration={6000} // 6 seconds
  onClose={() => setToast(null)}
/>
```

### 5. Contract Interaction Examples

**Reading Contract Data:**

```typescript
// Get user's staked balance
const { data: stakedBalance } = useContractRead({
  address: deployedContracts.STAKING_CONTRACT,
  abi: STAKING_ABI,
  functionName: "getStakedBalance",
  args: [userAddress],
});

// Get current APY
const { data: currentAPY } = useContractRead({
  address: deployedContracts.STAKING_CONTRACT,
  abi: STAKING_ABI,
  functionName: "getCurrentAPY",
});
```

**Writing to Contracts:**

```typescript
// Stake tokens
const { write: stake, isLoading: isStaking } = useContractWrite({
  address: deployedContracts.STAKING_CONTRACT,
  abi: STAKING_ABI,
  functionName: "stake",
  onSuccess: () => {
    setToast({
      message: "Successfully staked tokens!",
      type: "success",
      transactionType: "stake",
    });
  },
  onError: (error) => {
    setToast({
      message: `Staking failed: ${error.message}`,
      type: "error",
      transactionType: "stake",
    });
  },
});

// Call the function
const handleStake = (amount: bigint) => {
  setToast({
    message: "Staking tokens...",
    type: "loading",
    transactionType: "stake",
  });
  stake({ args: [amount] });
};
```

### 6. Contract Utilities

**File: `utils/contracts.ts`**

```typescript
import { formatUnits, parseUnits } from "viem";

// Format token amounts for display
export const formatTokenAmount = (amount: bigint, decimals: number = 18) => {
  return formatUnits(amount, decimals);
};

// Parse user input to contract format
export const parseTokenAmount = (amount: string, decimals: number = 18) => {
  return parseUnits(amount, decimals);
};

// Calculate APY percentage
export const calculateAPY = (rewardRate: bigint, totalStaked: bigint) => {
  // Your APY calculation logic here
  return (Number(rewardRate) / Number(totalStaked)) * 100;
};
```

## 📱 Responsive Design & Mini App Detection

The project includes intelligent responsive design that automatically detects whether the app is running as a mini app or on desktop/web.

### ResponsiveShell Component

**File: `app/components/ResponsiveShell.tsx`**

The `ResponsiveShell` component automatically detects the environment and adjusts the UI accordingly:

```typescript
// Mini App Detection Logic
const detectMiniApp = () => {
  try {
    const inFrame = window !== window.top;
    const userAgent = navigator.userAgent || "";
    const referrer = document.referrer || "";
    const href = window.location?.href || "";
    const inMini =
      inFrame ||
      !!isFrameReady ||
      href.includes("frame") ||
      referrer.includes("farcaster") ||
      userAgent.includes("Farcaster");
    setIsMiniApp(inMini);
  } catch {
    setIsMiniApp(false);
  }
};
```

**Detection Methods:**

- **Frame Detection**: Checks if running inside an iframe (`window !== window.top`)
- **MiniKit Ready State**: Uses `isFrameReady` from MiniKit
- **URL Analysis**: Looks for "frame" in the URL
- **Referrer Check**: Detects Farcaster referrer
- **User Agent**: Identifies Farcaster user agent

**Responsive Behavior:**

- **Mobile Layout**: Applied when `isMobile || isMiniApp`
- **Desktop Layout**: Applied for web/desktop usage
- **Loading Screen**: Shows initialization screen during startup
- **Navigation**: Mobile navigation for mini apps, desktop header for web

**Usage:**

```typescript
// Wrap your app content
<ResponsiveShell>
  <YourAppContent />
</ResponsiveShell>
```

## 📁 Project Structure

```
DBRO-STAKING-MINI-APP/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json/route.ts    # Manifest endpoint
│   ├── api/                           # API routes
│   │   ├── webhook/                   # Farcaster webhooks
│   │   │   └── route.ts              # Handles frame events (add/remove/notifications)
│   │   ├── notify/                    # Notification system
│   │   │   └── route.ts              # Sends notifications to users
│   │   ├── get-user-fid/              # User FID lookup
│   │   │   └── route.ts              # Gets FID from user address
│   │   ├── list-stored-fids/         # List stored FIDs
│   │   │   └── route.ts              # Lists all stored user FIDs
│   │   ├── transaction-notification/ # Transaction notifications
│   │   │   └── route.ts              # Handles transaction-specific notifications
│   │   └── debug-notifications/      # Debug notifications
│   │       └── route.ts              # Debug endpoint for testing notifications
│   ├── components/                     # React components
│   │   ├── Toast.tsx                  # Toast notification component
│   │   ├── ResponsiveShell.tsx       # Responsive layout wrapper
│   │   ├── Header.tsx                 # Desktop header component
│   │   ├── MobileNavigation.tsx       # Mobile navigation component
│   │   ├── UserProfileCard.tsx       # User profile display
│   │   └── Footer.tsx                 # Footer component
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # App layout
│   ├── page.tsx                       # Main page
│   ├── staking/                       # Staking page
│   │   └── page.tsx                   # Staking functionality
│   ├── morpho/                        # Morpho integration page
│   │   └── page.tsx                   # Morpho DeFi examples
│   └── providers.tsx                  # App providers (Wagmi, etc.)
├── scripts/                          # Manifest management scripts
│   ├── generate-manifest.js          # Generate manifest
│   ├── sign-manifest.js              # Sign manifest
│   └── validate-manifest.js          # Validate manifest
├── lib/                              # Utilities
│   ├── notification-client.ts        # Notification client utilities
│   ├── notification.ts               # Redis notification management
│   ├── redis.ts                      # Redis connection setup
│   └── useUserProfile.ts             # User profile hook
├── public/                           # Static assets
│   ├── newLogo.png                   # App logo
│   ├── newIcon.jpg                   # App icon
│   ├── newHero.png                   # Hero image
│   ├── newSplash.png                 # Splash screen
│   └── ...                           # Other assets
├── contracts/                        # Smart contract configs
│   ├── deployedContracts.ts          # Contract addresses
│   └── abis/                         # Contract ABIs
│       ├── DBRO_TOKEN.json           # Token contract ABI
│       └── STAKING_CONTRACT.json     # Staking contract ABI
├── utils/                            # Contract utilities
│   └── contracts.ts                  # Contract helper functions
└── env.template                      # Environment template
```

## 🔧 API Endpoints Documentation

### Webhook Endpoint (`/api/webhook`)

**Purpose**: Handles Farcaster frame events and user interactions

**Events Handled:**

- `frame_added`: When user adds the mini app to their frame
- `frame_removed`: When user removes the mini app
- `notifications_enabled`: When user enables notifications
- `notifications_disabled`: When user disables notifications

**Security**: Verifies FID ownership using Optimism Key Registry

**Usage:**

```typescript
// Automatically called by Farcaster when events occur
// Stores/removes user notification details in Redis
```

### Notification Endpoint (`/api/notify`)

**Purpose**: Sends notifications to users via Farcaster

**Features:**

- Regular notifications with custom title/body
- Staking-specific notifications with action types
- Error handling and response status codes

**Usage:**

```typescript
// Send regular notification
fetch("/api/notify", {
  method: "POST",
  body: JSON.stringify({
    notification: {
      title: "Welcome!",
      body: "Thanks for using our app",
      notificationDetails: userNotificationDetails,
    },
  }),
});

// Send staking notification
fetch("/api/notify", {
  method: "POST",
  body: JSON.stringify({
    stakingAction: {
      action: "stake",
      amount: "1000",
      token: "DBRO",
    },
    notification: {
      notificationDetails: userNotificationDetails,
    },
  }),
});
```

### Get User FID (`/api/get-user-fid`)

**Purpose**: Retrieves FID (Farcaster ID) for a given user address

**Parameters:**

- `userAddress`: Ethereum address to lookup

**Response:**

```json
{
  "success": true,
  "userAddress": "0x...",
  "fid": 12345,
  "message": "Mock FID returned for testing"
}
```

### List Stored FIDs (`/api/list-stored-fids`)

**Purpose**: Lists all stored user FIDs in Redis

**Usage**: Debug endpoint to see which users have notification details stored

### Transaction Notification (`/api/transaction-notification`)

**Purpose**: Handles transaction-specific notifications

**Features:**

- Transaction success/failure notifications
- Custom messages based on transaction type
- Integration with toast notification system

### Debug Notifications (`/api/debug-notifications`)

**Purpose**: Debug endpoint for testing notification system

**Usage**: Test notifications without going through normal flow

## 📚 Library Documentation

### Notification Client (`lib/notification-client.ts`)

**Purpose**: Client-side utilities for sending notifications

**Key Functions:**

```typescript
// Send frame notification
export async function sendFrameNotification({
  title,
  body,
  notificationDetails,
}: {
  title: string;
  body: string;
  notificationDetails?: NotificationDetails;
});

// Send staking-specific notification
export async function sendStakingNotification({
  action,
  amount,
  token = "DBRO",
  notificationDetails,
}: {
  action: "stake" | "unstake" | "claim" | "unwrap";
  amount?: string;
  token?: string;
  notificationDetails?: NotificationDetails;
});

// Send failed transaction notification
export async function sendFailedTransactionNotification({
  action,
  notificationDetails,
}: {
  action: "stake" | "unstake" | "claim" | "unwrap";
  notificationDetails?: NotificationDetails;
});
```

**Notification Types:**

- **Stake**: "🎉 Staking Successful!" with amount confirmation
- **Unstake**: "💸 Unstaking Complete!" with amount confirmation
- **Claim**: "🎁 Rewards Claimed!" with NFT minting confirmation
- **Unwrap**: "📦 NFT Unwrapped!" with token availability confirmation
- **Failed**: "❌ [Action] Failed" with error guidance

### Notification Management (`lib/notification.ts`)

**Purpose**: Redis-based notification detail management

**Key Functions:**

```typescript
// User notification details
export async function getUserNotificationDetails(fid: number);
export async function setUserNotificationDetails(
  fid: number,
  details: FrameNotificationDetails,
);
export async function deleteUserNotificationDetails(fid: number);

// User FID mapping
export async function setUserFid(userAddress: string, fid: number);
export async function getUserFid(userAddress: string);
export async function deleteUserFid(userAddress: string);
```

**Redis Keys:**

- `{projectName}:user:{fid}`: Stores notification details
- `{projectName}:fid:{address}`: Maps address to FID

### User Profile Hook (`lib/useUserProfile.ts`)

**Purpose**: React hook for managing user profile data

**Features:**

- Integrates with Wagmi for wallet connection
- Uses MiniKit context for Farcaster profile data
- Provides loading states and error handling

**Usage:**

```typescript
import { useUserProfile } from '@/lib/useUserProfile';

function MyComponent() {
  const { profile, isLoading, error } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;
  if (!profile) return <div>Not connected</div>;

  return (
    <div>
      <p>Address: {profile.address}</p>
      <p>Username: {profile.username}</p>
      <p>FID: {profile.fid}</p>
    </div>
  );
}
```

**Profile Interface:**

```typescript
export interface UserProfile {
  address: string;
  ensName?: string;
  baseName?: string;
  displayName?: string;
  username?: string;
  profilePicture?: string;
  fid?: number;
  isConnected: boolean;
}
```

### Redis Connection (`lib/redis.ts`)

**Purpose**: Redis connection setup using Upstash

**Configuration:**

- Uses `REDIS_URL` and `REDIS_TOKEN` environment variables
- Provides typed Redis client for notification storage
- Handles connection errors gracefully

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Code Formatting
npm run format           # Format all code with Prettier
npm run format:check     # Check code formatting without making changes

# Manifest Management
npm run manifest:generate    # Generate Farcaster manifest
npm run manifest:sign        # Sign manifest with Farcaster account
npm run manifest:validate    # Validate manifest configuration
```

## 🎯 Key Features

### Farcaster Integration

- **Manifest Management**: Automated generation and signing of Farcaster manifests
- **Account Association**: Cryptographically signed ownership verification
- **Webhook Support**: Real-time notifications and user interactions
- **Frame Metadata**: Proper Open Graph and social media integration

### Staking Functionality

- **Token Staking**: Stake DBRO tokens for rewards
- **APY Display**: Real-time reward calculations
- **Transaction Monitoring**: Track staking transactions
- **User Profiles**: Farcaster-integrated user management

### Technical Stack

- **Next.js 15**: Latest React framework with App Router
- **MiniKit**: Coinbase's Mini App framework
- **OnchainKit**: Base ecosystem integration
- **Tailwind CSS**: Utility-first styling
- **Redis**: Background notification system
- **TypeScript**: Type-safe development
- **Viem**: Ethereum library for contract interactions
- **Wagmi**: React hooks for Ethereum

### Smart Contract Integration

- **Contract Configuration**: Easy setup in `contracts/deployedContracts.ts`
- **ABI Management**: Add your contract ABIs for type-safe interactions
- **RPC Configuration**: Configure Base RPC endpoints in environment variables
- **Read/Write Operations**: Built-in hooks for contract interactions
- **Transaction Handling**: Automatic transaction monitoring and status updates

### Toast Notification System

- **Real-time Feedback**: Visual feedback for all user actions
- **Transaction States**: Loading, success, and error states
- **Custom Icons**: Different icons for different transaction types
- **Auto-dismiss**: Configurable auto-hide timers
- **Manual Close**: Users can manually dismiss notifications

### Responsive Design

- **Mini App Detection**: Automatically detects if running in Farcaster frame
- **Mobile Optimization**: Responsive layout for mobile devices
- **Desktop Support**: Full desktop experience for web users
- **Loading States**: Smooth initialization with branded loading screen

### Background Notifications

- Redis-backed notification system using Upstash
- Ready-to-use notification endpoints in `api/notify` and `api/webhook`
- Notification client utilities in `lib/notification-client.ts`

### Theming

- Custom theme defined in `theme.css` with OnchainKit variables
- Pixel font integration with Pixelify Sans
- Dark/light mode support through OnchainKit

## 🔧 Troubleshooting

### Common Issues

**Manifest not found:**

```bash
npm run manifest:generate
```

**Account association missing:**

```bash
npm run manifest:sign
```

**Environment variables not loading:**

```bash
# Make sure .env.local exists and is properly formatted
cp env.template .env.local
```

**Ngrok URL not working:**

```bash
# Ensure ngrok is running and update NEXT_PUBLIC_URL
ngrok http 3000
# Copy the https URL to .env.local
```

**Build errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Contract interaction issues:**

```bash
# Check if contract addresses are correct
# Verify ABI files are properly formatted JSON
# Ensure RPC endpoint is working
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  $NEXT_PUBLIC_BASE_URL

# Check if wallet is connected
# Verify user has sufficient gas tokens
```

**Toast notifications not showing:**

```bash
# Ensure Toast component is imported correctly
# Check if toast state is properly managed
# Verify Toast component is rendered in the component tree
```

**Responsive design issues:**

```bash
# Check if ResponsiveShell is wrapping your content
# Verify mini app detection logic
# Test on both mobile and desktop
# Check if isFrameReady is working correctly
```

### Validation Checklist

**Basic Setup:**

- [ ] Environment variables configured
- [ ] Manifest generated (`npm run manifest:generate`)
- [ ] Manifest signed (`npm run manifest:sign`)
- [ ] Validation passed (`npm run manifest:validate`)
- [ ] Local development working (`npm run dev`)
- [ ] Ngrok tunnel active (for testing)
- [ ] Production deployment successful
- [ ] Production manifest accessible

**Contract Integration:**

- [ ] Contract addresses added to `deployedContracts.ts`
- [ ] Contract ABIs added to `contracts/abis/` directory
- [ ] RPC endpoint configured and working
- [ ] Contract read operations working
- [ ] Contract write operations working
- [ ] Toast notifications displaying correctly
- [ ] Transaction states properly handled

**Notification System:**

- [ ] Redis connection working
- [ ] Webhook endpoint responding
- [ ] Notification details being stored
- [ ] Notifications being sent successfully
- [ ] User FID mapping working

**Responsive Design:**

- [ ] Mini app detection working
- [ ] Mobile layout displaying correctly
- [ ] Desktop layout displaying correctly
- [ ] Loading screen showing properly
- [ ] Navigation working on both platforms

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
# Set environment variables in Vercel dashboard
```

### Netlify

```bash
npm run build
# Deploy dist folder to Netlify
# Set environment variables in Netlify dashboard
```

### Custom Server

```bash
npm run build
npm start
# Configure your server to serve the Next.js app
```

## 📚 Additional Resources

- [Farcaster Mini Apps Documentation](https://docs.farcaster.xyz/mini-apps)
- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit Documentation](https://docs.base.org/builderkits/onchainkit/getting-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Farcaster Developer Tools](https://farcaster.xyz/~/developers)
- [Base Documentation](https://docs.base.org)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Created by Justin Taylor with Decentral Bros**

For support and questions, visit [https://www.dbro.dev](https://www.dbro.dev) or join our community on Farcaster.
