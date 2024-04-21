"use client"

import "../../globals.css";
import Header from "../../../components/shared/Header";
import React from "react";
import WorkspaceHeader from "@/app/(diagram)/diagram/[diagram_id]/components/WorkspaceHeader";
import {usePathname} from "next/navigation";

export default function HeaderWrapper() {
    const pathname = usePathname();
    const diagramId = pathname.split('/diagram/')[1];

    return (
        <Header>
            {diagramId && (
                <WorkspaceHeader />
            )}
        </Header>
    );
}