# Contributing to Unified dApp/Mini App Solution

Thank you for your interest in contributing to this unified solution! This guide will help you understand the project structure, the problem we're solving, and how to contribute effectively.

## Table of Contents

1. [Understanding the Problem](#understanding-the-problem)
2. [Repository Structure](#repository-structure)
3. [Key Technologies](#key-technologies)
4. [Getting Started](#getting-started)
5. [How to Contribute](#how-to-contribute)
6. [Development Workflow](#development-workflow)
7. [Testing Your Changes](#testing-your-changes)
8. [Code Style Guidelines](#code-style-guidelines)
9. [Areas Needing Help](#areas-needing-help)

## Understanding the Problem

### The Core Issue

The Base ecosystem currently has a disconnect between:
- **Traditional Web dApps**: Built for browsers, work with standard wallets (MetaMask, WalletConnect, etc.)
- **Base Mini Apps**: Designed specifically for the Base app mobile experience
- **Farcaster Mini Apps**: Built for Farcaster's social frame context

Developers are forced to maintain **three separate codebases** to reach all platforms, leading to:
- Increased development time and costs
- Inconsistent user experiences across platforms
- Higher maintenance overhead
- Limited cross-platform functionality

### What We're Building

We're creating a **unified codebase** that automatically detects the runtime environment and adapts accordingly. One build that works seamlessly as:
- A web dApp in browsers
- A Base Mini App in the Base mobile app
- A Farcaster Mini App in Farcaster frames

### Current Status

- ✅ **`DBRO-MINI-KIT-STARTER/`**: This is the **working solution** that successfully runs across all three platforms (dApp, Base App, Farcaster)
- ⚠️ **`basekit-starter-improved/`**: An attempt to merge the working solution into the new Base starter kit structure - **needs work to fully function across all platforms**
  - **🔗 Live Demo**: [https://basekit-starter-improved.vercel.app/](https://basekit-starter-improved.vercel.app/)
  - **Status**: ✅ Base App works | ⚠️ Web dApp partial | ❌ Farcaster not fully working (help needed!)
- 📚 **`basekit-starter-main/`**: The official Base starter kit reference - **only works in Base App**, doesn't support dApp or Farcaster wallet connections

### The Challenge

The new Base starter kit (`basekit-starter-main`) has issues:
- **SafeArea handling**: Affects Farcaster wallet connections
- **Platform detection**: Not robust enough for cross-platform support
- **Wallet integration**: Missing proper handling for different wallet contexts
- **Responsive design**: Doesn't adapt well to web/desktop contexts

## Repository Structure

```
My-Mini-App/
├── CONTRIBUTING.md              # This file - contribution guidelines
├── README.md                    # Main repository overview
│
├── DBRO-MINI-KIT-STARTER/      # ✅ WORKING SOLUTION
│   ├── app/
│   │   ├── components/          # React components with cross-platform logic
│   │   │   ├── ResponsiveShell.tsx  # Platform detection & responsive layout
│   │   │   ├── Header.tsx           # Desktop header with wallet UI
│   │   │   ├── MobileNavigation.tsx # Mobile/Farcaster navigation
│   │   │   └── ...
│   │   ├── api/                 # API routes for notifications, webhooks
│   │   ├── providers.tsx        # MiniKit provider configuration
│   │   └── ...
│   ├── lib/                     # Utilities (notifications, Redis, user profile)
│   ├── contracts/               # Smart contract configurations
│   ├── scripts/                 # Manifest generation/signing scripts
│   └── README.md                # Detailed setup guide
│
├── basekit-starter-improved/    # ⚠️ WORK IN PROGRESS
│   ├── app/
│   │   ├── components/          # Attempted merge of working components
│   │   ├── api/                 # API routes (mostly complete)
│   │   ├── rootProvider.tsx     # OnchainKit provider (different from DBRO)
│   │   └── ...
│   └── README.md                # Current status and setup
│
├── basekit-starter-main/        # 📚 REFERENCE ONLY
│   └── README.md                # Official Base starter (Base App only)
│
└── Documentation/
    ├── BASE_TEAM_SUMMARY.md           # Quick overview for Base team
    ├── DETAILED_COMPARISON_TABLE.md   # Feature comparison
    ├── DEVELOPER_FEEDBACK_BASE_TEAM.md # Constructive feedback
    └── TECH_PAPER_UNIFIED_DAPP_MINIAPP.md # Technical deep dive
```

### Key Files to Understand

#### Platform Detection (`ResponsiveShell.tsx`)
```typescript
// This is the core logic that makes cross-platform work possible
const detectMiniApp = () => {
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
};
```

This logic detects if the app is running in:
- An iframe (Farcaster/Base Mini App)
- Base app context (via `isFrameReady`)
- Farcaster context (via referrer/user agent)

#### Provider Configuration Differences

**DBRO-MINI-KIT-STARTER** (Working):
```typescript
// Uses MiniKitProvider directly
<MiniKitProvider
  projectId={...}
  apiKey={...}
  chain={base}
  config={{
    paymaster: ...,
    wallet: {
      supportedWallets: { rabby: false, trust: true, frame: false }
    }
  }}
>
```

**basekit-starter-improved** (Needs Fix):
```typescript
// Uses OnchainKitProvider with miniKit prop
<OnchainKitProvider
  config={{...}}
  miniKit={{
    enabled: true,
    autoConnect: true,
  }}
>
```

The difference in provider setup may be affecting cross-platform compatibility.

## Key Technologies

- **Next.js 15**: React framework with App Router
- **MiniKit**: Coinbase's Mini App framework
- **OnchainKit**: Base ecosystem integration library
- **Wagmi**: React hooks for Ethereum
- **Viem**: Ethereum library for contract interactions
- **Tailwind CSS**: Utility-first styling
- **Redis (Upstash)**: Background notification storage
- **TypeScript**: Type-safe development

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A Base app account
- A Farcaster account
- Coinbase Developer Platform API key
- (Optional) Redis instance (Upstash) for notifications
- (Optional) ngrok for local testing

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd My-Mini-App
   ```

2. **Choose your starting point**:
   - For **working solution**: `cd DBRO-MINI-KIT-STARTER`
   - For **improvement work**: `cd basekit-starter-improved`

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp env.template .env.local
   # Edit .env.local with your configuration
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **For Mini App testing**, set up ngrok:
   ```bash
   ngrok http --url=help.ngrok.dev 3000
   # Update NEXT_PUBLIC_URL in .env.local with ngrok URL
   npm run manifest:generate
   npm run manifest:sign
   ```

## How to Contribute

### Types of Contributions Needed

1. **Platform Compatibility**
   - Fix SafeArea issues in `basekit-starter-improved`
   - Improve platform detection logic
   - Ensure wallet connections work in all contexts

2. **Code Merging**
   - Merge working patterns from `DBRO-MINI-KIT-STARTER` into `basekit-starter-improved`
   - Ensure provider configurations are compatible
   - Test cross-platform functionality

3. **Documentation**
   - Improve setup guides
   - Add troubleshooting sections
   - Document platform-specific quirks

4. **Testing**
   - Test on Base App
   - Test on Farcaster frames
   - Test as web dApp
   - Verify wallet connections in each context

5. **Feature Improvements**
   - Enhance responsive design
   - Improve error handling
   - Add more wallet options
   - Optimize performance

### Contribution Process

1. **Fork the repository**
   ```bash
   # Create a fork on GitHub, then:
   git remote add fork https://github.com/YOUR-USERNAME/My-Mini-App.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Make your changes**
   - Follow code style guidelines (below)
   - Test your changes in all three contexts:
     - Web browser (dApp mode)
     - Base App (via preview tool)
     - Farcaster (via frame)

4. **Test thoroughly**
   ```bash
   npm run lint
   npm run format:check
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

   Use clear, descriptive commit messages:
   - `fix: SafeArea handling for Farcaster wallet connections`
   - `feat: Improve platform detection logic`
   - `docs: Add troubleshooting guide for wallet connections`

6. **Push and create a Pull Request**
   ```bash
   git push fork feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description of the problem and solution
   - Mention which platforms you tested
   - Reference related issues if applicable
   - Add screenshots if UI changes

## Development Workflow

### Working on Platform Compatibility

If you're fixing cross-platform issues:

1. **Start with the working solution**
   ```bash
   cd DBRO-MINI-KIT-STARTER
   npm run dev
   ```

2. **Identify what works**
   - Test in browser (dApp mode)
   - Test in Base App preview
   - Test in Farcaster frame
   - Document the working configuration

3. **Compare with the improved version**
   ```bash
   cd ../basekit-starter-improved
   # Compare providers.tsx vs rootProvider.tsx
   # Compare ResponsiveShell implementations
   # Compare component structures
   ```

4. **Apply fixes incrementally**
   - Test after each change
   - Keep a working baseline
   - Document what each change addresses

### Testing Across Platforms

#### Testing as Web dApp

1. Open in browser: `http://localhost:3000`
2. Should show desktop layout
3. Wallet connection should work (MetaMask, WalletConnect, etc.)
4. Should NOT show mobile navigation

#### Testing in Base App

1. Deploy or use ngrok: `ngrok http 3000`
2. Use Base preview tool: `https://base.dev/preview`
3. Enter your app URL
4. Click "Launch" to test in Base App context
5. Verify wallet connects via Base account

#### Testing in Farcaster

1. Ensure manifest is signed: `npm run manifest:sign`
2. Use Farcaster developer tools
3. Add your app to a frame
4. Test in Farcaster mobile app
5. Verify wallet connects via Farcaster wallet

### Debugging Tips

#### Platform Detection Not Working?

```typescript
// Add debug logging
console.log('Platform Detection:', {
  inFrame: window !== window.top,
  isFrameReady,
  userAgent: navigator.userAgent,
  referrer: document.referrer,
  href: window.location.href,
});
```

#### Wallet Connection Issues?

- Check provider configuration matches context
- Verify `preference: "all"` is set
- Check `supportedWallets` configuration
- Test with different wallets (Trust, MetaMask, etc.)

#### SafeArea Issues?

- This affects Farcaster specifically
- Check if `safe-area-inset-*` CSS properties are needed
- May need conditional styling based on platform

## Testing Your Changes

### Local Testing Checklist

- [ ] App loads in browser (dApp mode)
- [ ] App loads in Base App preview
- [ ] App loads in Farcaster frame
- [ ] Wallet connects in browser context
- [ ] Wallet connects in Base App context
- [ ] Wallet connects in Farcaster context
- [ ] UI adapts correctly (desktop vs mobile)
- [ ] Navigation works on all platforms
- [ ] Smart contract interactions work
- [ ] Notifications work (if applicable)

### Automated Checks

```bash
# Linting
npm run lint

# Format checking
npm run format:check

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

### Manual Testing Scenarios

1. **Fresh Install Test**
   - Clone repository
   - Follow setup instructions
   - Verify everything works

2. **Wallet Switching Test**
   - Connect MetaMask
   - Disconnect
   - Connect Base account
   - Switch between contexts

3. **Platform Switching Test**
   - Open as dApp
   - Open in Base App
   - Open in Farcaster
   - Verify consistent experience

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define interfaces for props and data structures
- Avoid `any` types - use `unknown` if type is truly unknown
- Use const assertions for immutable data

```typescript
// Good
interface ResponsiveShellProps {
  children: React.ReactNode;
}

// Bad
function ResponsiveShell(props: any) { }
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use meaningful prop names

```typescript
// Good
export default function ResponsiveShell({ children }: ResponsiveShellProps) {
  // Component logic
}

// Bad
export default function RS(props: any) { }
```

### Naming Conventions

- Components: `PascalCase` (e.g., `ResponsiveShell.tsx`)
- Utilities: `camelCase` (e.g., `useUserProfile.ts`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `NEXT_PUBLIC_URL`)
- Functions: `camelCase` (e.g., `detectMiniApp`)

### File Organization

```
app/
├── components/       # Reusable UI components
├── api/             # API routes
├── lib/             # Utility functions
└── [feature]/       # Feature-specific pages
```

### Formatting

- Use Prettier (configured in project)
- Run `npm run format` before committing
- Use 2 spaces for indentation
- Use single quotes for strings (when possible)
- Trailing commas in multi-line objects/arrays

## Areas Needing Help

### High Priority

1. **SafeArea Fix for Farcaster**
   - Identify why SafeArea affects wallet connections
   - Implement proper handling
   - Test across Farcaster contexts

2. **Provider Configuration**
   - Ensure `basekit-starter-improved` uses correct provider setup
   - Verify wallet connections work in all contexts
   - Test paymaster/sponsored transactions

3. **Platform Detection Robustness**
   - Improve detection logic
   - Handle edge cases
   - Add fallback mechanisms

### Medium Priority

4. **Documentation**
   - Add troubleshooting guides
   - Document platform-specific requirements
   - Create video walkthroughs

5. **Testing**
   - Add automated tests
   - Create test scenarios
   - Set up CI/CD

6. **Performance**
   - Optimize bundle size
   - Improve load times
   - Optimize re-renders

### Nice to Have

7. **Developer Tools**
   - Platform detection debugger
   - Wallet connection tester
   - Manifest validator UI

8. **Examples**
   - More use case examples
   - Different wallet scenarios
   - Various UI patterns

## Questions?

If you have questions or need help:

1. Check existing documentation
2. Review the working solution (`DBRO-MINI-KIT-STARTER`)
3. Open an issue on GitHub
4. Contact: [justin@noviclabs.com](mailto:justin@noviclabs.com)

## About

**Built by**: Justin Taylor  
**X (Twitter)**: [@Decentralbros_](https://www.x.com/Decentralbros_)  
**Email**: [justin@noviclabs.com](mailto:justin@noviclabs.com)

## Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Acknowledged in presentations to the Base team

Thank you for helping make this unified solution a reality! 🚀

