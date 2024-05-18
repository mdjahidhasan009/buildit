"use client"

import "../../globals.css";
import Header from "../../../components/shared/Header/Header";
import React from "react";
import WorkspaceHeader from "@/app/(diagram)/diagram/[diagram_id]/components/WorkspaceHeader";
import {usePathname} from "next/navigation";

export default function DiagramHeaderWrapper() {
    const pathname = usePathname();
    const diagramId = pathname.split('/diagram/')[1];

    return (
      <Header>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

          {diagramId && (
            <WorkspaceHeader/>
          )}
      </Header>
    );
}