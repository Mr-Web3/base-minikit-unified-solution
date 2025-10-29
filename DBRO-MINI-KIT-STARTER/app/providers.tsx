"use client";

import { type ReactNode } from "react";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { base } from "viem/chains";

// Create custom base chain with your RPC URL
// const customBase = {
//   ...base,
//   rpcUrls: {
//     default: {
//       http: [process.env.NEXT_PUBLIC_BASE_URL || base.rpcUrls.default.http[0]],
//     },
//     public: {
//       http: [process.env.NEXT_PUBLIC_BASE_URL || base.rpcUrls.default.http[0]],
//     },
//   },
// };

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "mini-app-theme",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          logo: process.env.NEXT_PUBLIC_ICON_URL,
        },
        wallet: {
          display: "modal",
          termsUrl: "https://www.decentralbros.io/terms",
          privacyUrl: "https://www.decentralbros.io/privacy",
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  );
}
