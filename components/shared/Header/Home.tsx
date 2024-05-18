"use client";
import { cn } from "@/lib/cn";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import Kbd from "@/components/shared/ui/Kbd";

export default function Home() {

  return (
    <div>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-6 rounded-lg p-1 font-medium",
          "select-none outline-none",
          "border border-white/20 bg-black",
          "transition-all duration-200 ease-in-out",
          "hover:bg-white/20 hover:text-almost-white",
          "focus:text-almost-white focus:ring-1 focus:ring-almost-white focus:ring-offset-2 focus:ring-offset-black",
          "group"
        )}
      >
        <div className={cn("flex items-center gap-2")}>
          <HomeIcon
            size={16}
            className={cn(
              "translate-x-0.5",
              "transition-transform duration-100 ease-in-out",
              "group-hover:translate-x-0"
            )}
            aria-hidden="true"
          />
          <span className="hidden md:block">Dashboard</span>
        </div>
        <span className="hidden md:block"><Kbd keys={["B"]} /></span>
      </Link>
    </div>
  );
}
