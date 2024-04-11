'use client';

import { redirect } from "next/navigation";
import { cn } from "@/lib/cn";
import Button from "@/components/Dashboard/Button";
import ContentCard from "@/components/Dashboard/ContentCard";
import { serialize } from "@/lib/serialize";
import { useSession } from "next-auth/react";
import useApi from "@/utils/useApi";
import { Diagram } from "@/core/domain/entities/Diagram";

export default function Page() {
    const { data, error, loading } = useApi('/api/v1/diagrams');
    const { data: session, status: sessionStatus } = useSession();


    if (sessionStatus === "unauthenticated") {
        redirect("/dashboard");
    }

    if(!data) return;
    const diagrams = data?.data?.diagrams as Diagram[] || []; // Type assertion here

    return (
        <div className="min-h-[100vh] min-w-[100vw] grid place-items-center">
            <div
                className={cn(
                    "flex w-[576px] flex-col rounded-xl p-5",
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

                                    <Button dataCount={diagrams.length} routePath="diagrams"/>
                                </div>

                                <ContentCard
                                    contents={serialize(diagrams)}
                                    routePath="diagrams"
                                />
                            </>
                        )
                }

            </div>

        </div>
    );
}
