'use client';

import { redirect } from "next/navigation";
import { cn } from "@/lib/cn";
import Button from "@/components/Dashboard/Button";
import ContentCard from "@/components/Dashboard/ContentCard";
import { serialize } from "@/lib/serialize";
import { useSession } from "next-auth/react";
import useApi from "@/utils/useApi";
import { ISnippet } from "@/components/Snippet/ISnippet";

export default function Page() {
  const { data, error, loading } = useApi('/api/v1/snippets');
  const { data: session, status: sessionStatus } = useSession();


  if (sessionStatus === "unauthenticated") {
    redirect("/dashboard");
  }

  if(!data) return;
  const snippets = data as ISnippet[]; // Type assertion here

  return (
    <div
      className={cn(
        "flex w-[576px] flex-col rounded-xl p-5",
        "border border-white/20 bg-black shadow-xl shadow-black/40"
      )}
    >
      <div className={cn("flex w-full items-center justify-between")}>
        <h2 className={cn("text-xl font-extrabold")}>Snippets</h2>

        <Button dataCount={snippets.length} routePath="snippets" />
      </div>

      <ContentCard
          contents={serialize(snippets)}
          routePath="snippets"
      />
    </div>
  );
}
