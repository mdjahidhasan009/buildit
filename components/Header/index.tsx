"use client";

import { useSession } from "next-auth/react";

import { cn } from "@/lib/cn";
import Home from "./Home";
import Message from "./Message";
import Social from "./Social";
import Help from "./Help";
import Auth from "./Auth";
import React from "react";
import '../../app/globals.css';

export default function Header({ children } : { children?: any }) {
  const { status: sessionStatus } = useSession();


  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between px-[18px] font-medium",
        "border-b border-white/20 bg-black shadow-xl shadow-black/40"
      )}
    >
      <Home />
      <Message />

      {sessionStatus !== "loading" && (
        <div className={cn("flex items-center justify-center")}>
          {children}
          <Social/>
          <Help/>
          <Auth/>
        </div>
      )}
    </header>
  );
}
