# Base Mini App Quickstart - Reference Implementation

> 📚 **REFERENCE ONLY** - This is the official Base Mini App starter kit preserved for reference and comparison purposes.

## 🎯 Purpose

This folder contains the **official Base starter kit** that demonstrates the current Base approach. It is preserved here for:
- **Reference**: Understanding the official Base starter structure
- **Comparison**: Comparing with the working unified solution
- **Analysis**: Identifying limitations and areas for improvement

## ⚠️ Important Notice

**This starter kit only works in Base App context** and does not support:
- ❌ Standalone web dApp functionality
- ❌ Farcaster wallet connections properly
- ❌ Cross-platform compatibility

For a working unified solution that supports all platforms, see:
- ✅ **Working Solution**: [`../DBRO-MINI-KIT-STARTER/`](../DBRO-MINI-KIT-STARTER/) - Fully functional across all platforms
- ⚠️ **Merge Attempt**: [`../basekit-starter-improved/`](../basekit-starter-improved/) - Attempting to merge working solution

## 📋 Overview

This is a demo Mini App application built using OnchainKit and the Farcaster SDK. It demonstrates how to build a waitlist sign-up mini app that can be published to the Base app.

## Prerequisites

Before getting started, make sure you have:

* Base app account
* A [Farcaster](https://farcaster.xyz/) account
* [Vercel](https://vercel.com/) account for hosting the application
* [Coinbase Developer Platform](https://portal.cdp.coinbase.com/) Client API Key

## Getting Started

### 1. Clone this repository 

```bash
git clone https://github.com/base/demos.git
```

### 2. Install dependencies:

```bash
cd demos/minikit/waitlist-mini-app-qs
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and add your environment variables:

```bash
NEXT_PUBLIC_PROJECT_NAME="Your App Name"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<Replace-WITH-YOUR-CDP-API-KEY>
NEXT_PUBLIC_URL=
```

### 4. Run locally:

```bash
npm run dev
```

## Customization

### Update Manifest Configuration

The `minikit.config.ts` file configures your manifest located at `app/.well-known/farcaster.json`.

**Skip the `accountAssociation` object for now.**

To personalize your app, change the `name`, `subtitle`, and `description` fields and add images to your `/public` folder. Then update their URLs in the file.

## Deployment

### 1. Deploy to Vercel

```bash
vercel --prod
```

You should have a URL deployed to a domain similar to: `https://your-vercel-project-name.vercel.app/`

### 2. Update environment variables

Add your production URL to your local `.env` file:

```bash
NEXT_PUBLIC_PROJECT_NAME="Your App Name"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<Replace-WITH-YOUR-CDP-API-KEY>
NEXT_PUBLIC_URL=https://your-vercel-project-name.vercel.app/
```

### 3. Upload environment variables to Vercel

Add environment variables to your production environment:

```bash
vercel env add NEXT_PUBLIC_PROJECT_NAME production
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY production
vercel env add NEXT_PUBLIC_URL production
```

## Account Association

### 1. Sign Your Manifest

1. Navigate to [Farcaster Manifest tool](https://farcaster.xyz/~/developers/mini-apps/manifest)
2. Paste your domain in the form field (ex: your-vercel-project-name.vercel.app)
3. Click the `Generate account association` button and follow the on-screen instructions for signing with your Farcaster wallet
4. Copy the `accountAssociation` object

### 2. Update Configuration

Update your `minikit.config.ts` file to include the `accountAssociation` object:

```ts
export const minikitConfig = {
    accountAssociation: {
        "header": "your-header-here",
        "payload": "your-payload-here",
        "signature": "your-signature-here"
    },
    frame: {
        // ... rest of your frame configuration
    },
}
```

### 3. Deploy Updates

```bash
vercel --prod
```

## Testing and Publishing

### 1. Preview Your App

Go to [base.dev/preview](https://base.dev/preview) to validate your app:

1. Add your app URL to view the embeds and click the launch button to verify the app launches as expected
2. Use the "Account association" tab to verify the association credentials were created correctly
3. Use the "Metadata" tab to see the metadata added from the manifest and identify any missing fields

### 2. Publish to Base App

To publish your app, create a post in the Base app with your app's URL.

## Learn More

For detailed step-by-step instructions, see the [Create a Mini App tutorial](https://docs.base.org/docs/mini-apps/quickstart/create-new-miniapp/) in the Base documentation.

## 📚 Related Documentation

This repository contains analysis and improvements to this starter kit:

- **Main README**: [`../README.md`](../README.md) - Overview of the unified solution project
- **Contributing Guide**: [`../CONTRIBUTING.md`](../CONTRIBUTING.md) - How to contribute to improvements
- **Working Solution**: [`../DBRO-MINI-KIT-STARTER/`](../DBRO-MINI-KIT-STARTER/) - Unified solution that works across all platforms
- **Technical Analysis**: [`../TECH_PAPER_UNIFIED_DAPP_MINIAPP.md`](../TECH_PAPER_UNIFIED_DAPP_MINIAPP.md) - Deep dive into limitations and solutions

## 🎯 Limitations Addressed in Unified Solution

The unified solution (`../DBRO-MINI-KIT-STARTER/`) addresses these limitations:

1. **Cross-Platform Support**: Works in web browsers, Base App, and Farcaster
2. **Complete Wallet Integration**: Full UI implementation with selective wallet support
3. **Sponsored Transactions**: Paymaster integration for gas-free transactions
4. **Better Developer Experience**: Automated manifest management, local development support
5. **Production-Ready Features**: Comprehensive API endpoints, notifications, smart contracts

---

**Note**: This folder is kept for reference. For production use, consider the unified solution in `../DBRO-MINI-KIT-STARTER/`.