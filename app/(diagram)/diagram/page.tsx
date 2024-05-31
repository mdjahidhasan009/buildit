'use client';

import { redirect } from "next/navigation";
import { cn } from "@/lib/cn";
import Button from "@/components/Dashboard/Button";
import ContentCard from "@/components/shared/ContentCard/ContentCard";
import { useSession } from "next-auth/react";
import useApi from "@/utils/useApi";
import React, {useEffect} from "react";
import {setIsDialogOpen, setRoutePath} from "@/lib/features/content/contentSlice";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import {setAllDiagrams} from "@/lib/features/diagram/diagramSlice";
import {IContentDeletePayload, IContentRenamePayload} from "@/components/shared/ContentCard/type";
import {IDiagram} from "@/app/(diagram)/constants/Diagram";

export default function Page() {
    const { data, error, loading } = useApi('/api/v1/diagrams');
    const { fetchData: rename, loading: renameLoading } = useApi('/api/v1/diagrams', 'PATCH');
    const { fetchData: deleteElement, loading: deleteLoading } = useApi('/api/v1/diagrams', 'DELETE');
    const { data: session, status: sessionStatus } = useSession();
    const dispatch = useDispatch();
    const diagrams: IDiagram[] | [] = useSelector((state: RootState) => state.diagram?.diagrams);

    useEffect(() => {
      if(data?.data) {
        dispatch(setAllDiagrams(data?.data?.diagrams || []));
        dispatch(setRoutePath("diagrams"))
      }
    }, [dispatch, data])


    if (sessionStatus === "unauthenticated") {
        redirect("/dashboard");
    }

    if(!data) return;

  const handleRenameADiagram = async (payload: IContentRenamePayload) => {
    const res = await rename(payload);
    if (res?.data?.id) {
      dispatch(setAllDiagrams( diagrams.map(item => item.id === payload.id ? res.data : item)));
      dispatch(setIsDialogOpen(false));
    }
  }

  const handleDeleteADiagram = async (payload: IContentDeletePayload) => {
    const res = await deleteElement(payload, `?id=${payload?.id}`);
    if (res?.data?.id) {
      dispatch(setAllDiagrams(diagrams.filter(item => item.id !== payload?.id )));
      dispatch(setIsDialogOpen(false));
    }
  }

    return (
        <div className="h-full min-w-[100vw] grid place-items-center">
            <div
                className={cn(
                    "flex w-5/6 md:w-[576px] flex-col rounded-xl p-5",
                    "border border-white/20 bg-black shadow-xl shadow-black/40"
                )}
            >
                {
                    loading
                        ? (
                            <p>Loading</p>
                        ) : (
                            <>
                                <div className={cn("flex w-full items-center justify-between")}>
                                    <h2 className={cn("text-xl font-extrabold")}>Diagrams</h2>

                                    <Button dataCount={diagrams.length} />
                                </div>

                              <ContentCard<IDiagram>
                                states={{
                                  contents: diagrams,
                                  isRenaming: renameLoading,
                                  isDeleting: deleteLoading
                                }}
                                handleRename={handleRenameADiagram}
                                handleDelete={handleDeleteADiagram}
                              />
                            </>
                        )
                }

            </div>

        </div>
    );
}
