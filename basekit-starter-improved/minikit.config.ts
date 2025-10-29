const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
*/
export const minikitConfig = {
  accountAssociation: {
    header:
      'eyJmaWQiOjc4ODgwMCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDQzOTI5OEVmQUQzMEY2MjgyMWM4NWI2NUFkNzVlN0MwNDFlMzY2RDcifQ',
    payload: 'eyJkb21haW4iOiJob3BlLWNoYWluLWZpdmUudmVyY2VsLmFwcCJ9',
    signature:
      'awENQzWNfUYOBMHYCTlXo0j4xme35nqL/VSnXAbLZVpmnr9B+pNLacL5ugsoe+N19Brxg6FY63RHb35HqKhpwhw=',
  },
  baseBuilder: {
    allowedAddresses: ['0x1d0B2cfeBaBB59b3AF59ff77DeF5397Ce4Be9e77'],
  },
  miniapp: {
    version: '1',
    name: 'DBRO Mini Template',
    subtitle: 'DBRO Mini Template',
    description:
      'A complete starter template for building Base mini apps with Farcaster integration.',
    screenshotUrls: [`${ROOT_URL}/screenshot1.jpg`, `${ROOT_URL}/screenshot2.jpg`, `${ROOT_URL}/screenshot3.jpg`],
    iconUrl: `${ROOT_URL}/newLogo.png`,
    splashImageUrl: `${ROOT_URL}/newLogo.png`,
    splashBackgroundColor: '#111111',
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: 'utility',
    tags: ['staking', 'dbro', 'rewards', 'apy', 'utilities'],
    heroImageUrl: `${ROOT_URL}/newHero.png`,
    tagline: 'Mini App for the Bros',
    ogTitle: 'DBRO Mini Template',
    ogDescription: 'A complete starter template for building Base mini apps with Farcaster integration.',
    ogImageUrl: `${ROOT_URL}/newLogo.png`,
    noindex: true,
  },
} as const;

