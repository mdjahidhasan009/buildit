"use client"
import React, { useEffect, useState } from 'react';
const Editor = dynamic(() => import("@/app/(diagram)/diagram/[diagram_id]/components/Editor"), { ssr: false });
const Canvas = dynamic(() => import("@/app/(diagram)/diagram/[diagram_id]/components/Canvas"), { ssr: false });
import dynamic from "next/dynamic";
import useApi from "@/utils/useApi";
import {useDispatch, useSelector} from "react-redux";
import {
  initDiagramData,
} from "@/lib/features/diagram/diagramSlice";
import {RootState} from "@/lib/reduxStore";

const Page = ({params}:any) => {
  const diagramState = useSelector((state: RootState) => state.diagram);
  const dispatch = useDispatch();
  const { data, loading, error } = useApi(`/api/v1/diagrams/${params?.diagram_id}`);

  useEffect(() => {
    if(!loading && data && (diagramState.title !== data?.data?.diagram?.title)) {
      const diagram = data?.data?.diagram;
      const title = diagram?.title;
      const diagramData = diagram?.diagramData;
      const elements = diagramData?.elements;
      const editorData = diagram?.editorData;


      dispatch(initDiagramData({
        data: {
          title,
          editorData,
          elements
        }
      }))
    }
  }, [data]);


  return (
    <div>
      {/* Workspace Layout  */}
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        {/* Document  */}
        {(loading)
          ? <div>Loading</div>
          : (
            <>
              <div className="h-full p-2">
                <Editor />
              </div>
              {/* Whiteboard/canvas  */}
              <div className='border-l-0 lg:border-l h-full p-2'>
                <Canvas />
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Page;