"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCoins, FaHome, FaRocket } from "react-icons/fa";

const MobileNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-[var(--app-card-border)] md:hidden">
      <div className="flex items-center justify-center gap-8 py-1">
        {/* Home Tab */}
        <Link
          href="/"
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
            pathname === "/"
              ? "text-[#1bf696] bg-none"
              : "text-[var(--app-foreground-muted)] hover:text-white"
          }`}
        >
          <FaHome size={20} />
          <span className="text-[10px] mt-1 font-medium leading-tight">
            Home
          </span>
        </Link>

        {/* Staking Tab */}
        <Link
          href="/staking"
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
            pathname === "/staking"
              ? "text-[#1bf696] bg-none"
              : "text-[var(--app-foreground-muted)] hover:text-white"
          }`}
        >
          <FaCoins size={20} />
          <span className="text-[10px] mt-1 font-medium leading-tight">
            Staking
          </span>
        </Link>

        {/* Morpho Tab */}
        <Link
          href="/morpho"
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
            pathname === "/morpho"
              ? "text-[#1bf696] bg-none"
              : "text-[var(--app-foreground-muted)] hover:text-white"
          }`}
        >
          <FaRocket size={20} />
          <span className="text-[10px] mt-1 font-medium leading-tight">
            Morpho
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
