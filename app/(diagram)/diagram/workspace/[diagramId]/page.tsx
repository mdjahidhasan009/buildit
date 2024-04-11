"use client"
import React, { useEffect, useState } from 'react';
const Editor = dynamic(() => import("@/app/(diagram)/diagram/workspace/[diagramId]/_components/Editor"), { ssr: false });
const Canvas = dynamic(() => import("@/app/(diagram)/diagram/workspace/[diagramId]/_components/Canvas"), { ssr: false });
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { FILE } from '../../dashboard/_components/FileList';
// import Canvas from '../_components/Canvas';
import dynamic from "next/dynamic";
import useApi from "@/utils/useApi";
import {useDispatch, useSelector} from "react-redux";
import {diagramSlice, setDiagramData, setEditorData, setTittle} from "@/lib/features/diagram/diagramSlice";
import {RootState} from "@/lib/reduxStore";

const Page = ({params } :{ params: { diagramId: string }}) => {
  const diagramState = useSelector((state: RootState) => state.diagram);
  const dispatch = useDispatch();
  const { data, loading, error } = useApi(`/api/v1/diagrams/${params?.diagramId}`);

  useEffect(() => {
    if(!loading && data) {
      const diagram = data?.data?.diagram;
      const title = diagram?.title;
      const diagramData = diagram?.diagramData;
      const elements = diagramData?.elements;
      const editorData = diagram?.editorData;

      dispatch(setTittle({ data: title }));
      dispatch(setEditorData({ data: editorData }));
      dispatch(setDiagramData({ data: { elements } }));
    }
  }, [data, loading, dispatch]);
  // const [triggerSave,setTriggerSave]=useState(false);
  // const convex=useConvex();
  // const [fileData,setFileData]=useState<FILE|any>();
  // useEffect(()=>{
  //   console.log("FILEID",params.fileId)
  //   params.fileId&&getFileData();
  // },[])

  const getFileData=async()=>{
    // const result=await convex.query(api.files.getFileById,{_id:params.fileId})
    // setFileData(result);
  }
  // @ts-ignore
  return (
    <div>

      {/* Workspace Layout  */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Document  */}
        {(loading)
          ? <div>Loading</div>
          : (
            <>
              <div style={{height: "100%"}}>
                <Editor
                  // onSaveTrigger={triggerSave}
                  // fileId={params.fileId}
                  // fileData=""
                  // fileData={
                  //   {
                  //     type: "header",
                  //     data: {
                  //       "text": "Why Telegram is the best messenger",
                  //       "level": 2
                  //     }
                  //   }
                  // }
                />
              </div>
              {/* Whiteboard/canvas  */}
              <div className='border-l' style={{height: "100%"}}>
                <Canvas
                  // onSaveTrigger={triggerSave}
                  // fileId={params.fileId}
                  // fileData={fileData}
                />
              </div>
            </>
          )
        }

      </div>
    </div>
  )
}

export default Page;