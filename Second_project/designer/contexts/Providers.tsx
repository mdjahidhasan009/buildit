"use client";

import { SessionProvider } from "next-auth/react";
import * as ToolTipPrimitive from "@radix-ui/react-tooltip";
import {DesignProvider} from "@/contexts/DesignProvider";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <DesignProvider>
        <ToolTipPrimitive.Provider delayDuration={0}>
          {children}
        </ToolTipPrimitive.Provider>
      </DesignProvider>
    </SessionProvider>
  );
}
