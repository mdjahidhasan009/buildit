'use client';

import { redirect } from "next/navigation";
import { cn } from "@/lib/cn";
import Button from "@/components/Dashboard/Button";
import ContentCard from "@/components/shared/ContentCard/ContentCard";
import { useSession } from "next-auth/react";
import { ISnippet } from "@/app/(code)/constants/ISnippet";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import {setAllSnippets} from "@/lib/features/snippet/snippetSlice";
import React, {useEffect} from "react";
import useApi from "@/utils/useApi";
import {setIsDialogOpen, setRoutePath} from "@/lib/features/content/contentSlice";
import {IContentDeletePayload, IContentRenamePayload} from "@/components/shared/ContentCard/type";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {LinkIcon} from "lucide-react";

export default function Page() {
  const { data, error, loading } = useApi('/api/v1/snippets');
  const { fetchData: rename, loading: renameLoading } = useApi('/api/v1/snippets', 'PATCH');
  const { fetchData: deleteElement, loading: deleteLoading } = useApi('/api/v1/snippets', 'DELETE');

  const snippets : ISnippet[] | [] = useSelector((state: RootState) => state.snippet?.allSnippets);
  const { data: session, status: sessionStatus } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if(data) {
      dispatch(setAllSnippets(data));
      dispatch(setRoutePath("snippets"))
    }
  }, [dispatch, data])

  if (sessionStatus === "unauthenticated") {
    redirect("/dashboard");
  }

  if(!data) return;

  const handleRenameASnippet = async (payload: IContentRenamePayload) => {
    const res = await rename(payload);
    if (res?.data?.id) {
      dispatch(setAllSnippets(snippets.map(item => item.id === payload.id ? res.data : item)));
      dispatch(setIsDialogOpen(false));
    }
  }

  const handleDeleteASnippet = async (payload: IContentDeletePayload) => {
    const res = await deleteElement(payload, `?id=${payload?.id}`);
    if (res?.data?.id) {
      dispatch(setAllSnippets(snippets.filter(item => item.id !== payload?.id )));
      dispatch(setIsDialogOpen(false));
    }
  }


  return (
    <div
      className={cn(
        "flex w-5/6 md:w-[576px] flex-col rounded-xl p-5",
        "border border-white/20 bg-black shadow-xl shadow-black/40"
      )}
    >
      <div className={cn("flex w-full items-center justify-between")}>
        <h2 className={cn("text-xl font-extrabold")}>Snippets</h2>

        <Button dataCount={snippets.length} />
      </div>

      <ContentCard<ISnippet>
        states={{
          contents: snippets,
          isRenaming: renameLoading,
          isDeleting: deleteLoading
        }}
        handleRename={handleRenameASnippet}
        handleDelete={handleDeleteASnippet}
      />
    </div>
  );
}
