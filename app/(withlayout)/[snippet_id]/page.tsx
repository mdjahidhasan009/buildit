'use client';

import Editor from "@/components/Editor";
import SetupStore from "@/components/Editor/SetupStore";
import { useSession } from "next-auth/react";
import useApi from "@/utils/useApi";

export default async function Page({ params }: { params: { snippet_id: string } }) {
  const { data, loading, error } = useApi(`/api/v1/snippets/${params.snippet_id}`);
  const { data: session, status } = useSession();

  if(!data) return;

  const isEditable: boolean = session?.user?.id === data?.userId;
  const isAuthenticated: boolean = !!session;

  return (
    <>
      <SetupStore snippet={data} />
      <Editor
        views={data?.views?.count | 0}
        editable={isEditable}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}
