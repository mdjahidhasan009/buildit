"use client";

import { SessionProvider } from "next-auth/react";
import * as ToolTipPrimitive from "@radix-ui/react-tooltip";
import {DesignProvider} from "@/contexts/DesignProvider";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import {store} from "@/lib/reduxStore";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <DesignProvider>
          <ToolTipPrimitive.Provider delayDuration={0}>
            {children}
          </ToolTipPrimitive.Provider>
        </DesignProvider>
      </SessionProvider>
    </Provider>
  );
}