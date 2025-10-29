# Farcaster Manifest Management

This project includes scripts to generate, sign, and validate your Farcaster Mini App manifest.

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.template .env.local
   # Edit .env.local with your values
   ```

3. **Generate your manifest:**

   ```bash
   npm run manifest:generate
   ```

4. **Sign your manifest with your Farcaster account:**

   ```bash
   npm run manifest:sign
   ```

5. **Validate your manifest:**
   ```bash
   npm run manifest:validate
   ```

## Available Scripts

### `npm run manifest:generate`

Generates a static `farcaster.json` manifest file in `public/.well-known/` based on your environment variables.

**What it does:**

- Creates the `.well-known` directory if it doesn't exist
- Generates a manifest with your app configuration
- Uses your existing images from the `public/` folder
- Warns you if account association is missing

### `npm run manifest:sign`

Interactive script to help you sign your manifest with your Farcaster account.

**What it does:**

- Guides you through the signing process
- Prompts for your account association values
- Updates your `.env.local` file with the signature
- Regenerates the manifest with the new signature

### `npm run manifest:validate`

Validates your manifest configuration and checks for common issues.

**What it checks:**

- Manifest file exists and is valid JSON
- Required fields are present
- Account association is configured
- Environment variables are set

## Signing Your Manifest

To sign your manifest with your Farcaster account:

1. **Visit the Farcaster Developer Tools:**
   Go to https://farcaster.xyz/~/developers/new

2. **Enter your domain:**
   Use the exact domain from your `NEXT_PUBLIC_URL` environment variable

3. **Get your account association:**
   The tool will generate three values:
   - `FARCASTER_HEADER`
   - `FARCASTER_PAYLOAD`
   - `FARCASTER_SIGNATURE`

4. **Run the signing script:**
   ```bash
   npm run manifest:sign
   ```
   Enter the three values when prompted.

## Environment Variables

Copy `env.template` to `.env.local` and configure:

### Required

- `NEXT_PUBLIC_URL` - Your app's domain (e.g., https://www.dbro.dev)
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` - App name (e.g., "DBRO Mini Temp")
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Get from https://portal.cdp.coinbase.com/

### App Configuration

- `NEXT_PUBLIC_APP_SUBTITLE` - App subtitle (e.g., "Stake your DBRO earn BIG!")
- `NEXT_PUBLIC_APP_DESCRIPTION` - App description
- `NEXT_PUBLIC_APP_PRIMARY_CATEGORY` - Category (e.g., "utility", "finance")

### Assets (URLs to your images)

- `NEXT_PUBLIC_ICON_URL` - Main app icon URL
- `NEXT_PUBLIC_APP_ICON` - App icon URL
- `NEXT_PUBLIC_APP_SPLASH_IMAGE` - Splash screen image
- `NEXT_PUBLIC_APP_HERO_IMAGE` - Hero image
- `NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR` - Splash background color

### SEO & Social Media

- `NEXT_PUBLIC_APP_TAGLINE` - App tagline
- `NEXT_PUBLIC_APP_OG_TITLE` - Open Graph title
- `NEXT_PUBLIC_APP_OG_DESCRIPTION` - Open Graph description
- `NEXT_PUBLIC_APP_OG_IMAGE` - Open Graph image

### Farcaster Account Association

- `FARCASTER_HEADER` - From signing tool
- `FARCASTER_PAYLOAD` - From signing tool
- `FARCASTER_SIGNATURE` - From signing tool

### Additional Services

- `REDIS_URL` - Redis URL for notifications (get from https://upstash.com/)
- `REDIS_TOKEN` - Redis token
- `NEXT_PUBLIC_BASE_URL` - Base RPC URL
- `NEXT_PUBLIC_PAYMASTER_SERVICE_URL` - Paymaster service URL
- `NEXT_PUBLIC_PAYMASTER_PROXY_SERVER_URL` - Paymaster proxy URL
- `TALENT_PROTOCOL_API_KEY` - Talent Protocol API key
- `TALENT_WALLET` - Talent Protocol wallet address

## How It Works

The system works in two modes:

1. **Static Mode (Recommended):** When you run `npm run manifest:generate`, it creates a static `farcaster.json` file that's served directly by Next.js.

2. **Dynamic Mode (Fallback):** The API route at `/.well-known/farcaster.json` serves a dynamically generated manifest if no static file exists.

## Troubleshooting

### Manifest not found

```bash
npm run manifest:generate
```

### Account association missing

```bash
npm run manifest:sign
```

### Validation errors

```bash
npm run manifest:validate
```

### Check your domain

Make sure your `NEXT_PUBLIC_URL` exactly matches the domain you entered in the Farcaster signing tool.

## Next Steps

After generating and signing your manifest:

1. **Deploy your app** to your domain
2. **Test the manifest** at `https://your-domain.com/.well-known/farcaster.json`
3. **Submit to Farcaster** for verification and discovery

Your Mini App will then be discoverable in Farcaster clients and eligible for developer rewards!
