"use client";
import { useStore } from "@/lib/store";
import type { Snippet } from "@prisma/client";
import { useRef } from "react";
import {ISnippet} from "@/components/Snippet/ISnippet";

export default function SetupStore({ snippet }: { snippet: Partial<ISnippet> }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useStore.getState().setAppState(snippet);

    initialized.current = true;
  }

  return null;
}
