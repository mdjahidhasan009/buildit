import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "@/lib/reduxStore";
import {setFileName} from "@/lib/features/diagram/diagramSlice";
import useApi from "@/utils/useApi";
import {useSession} from "next-auth/react";
import {redirect, usePathname} from "next/navigation";

function WorkspaceHeader({ params }: { params: any }) {
    const pathname = usePathname();
    const fileId = pathname.split('/workspace/')[1];
    const { data, fetchData, loading } = useApi(`/api/v1/diagram/${fileId}`, 'PUT');
    const { data: session, status: sessionStatus } = useSession();

    const fileName = useSelector((state: RootState) => state.diagram.fileName);
    const editorData = useSelector((state: RootState) => state.diagram.editorData);
    const diagramData = useSelector((state: RootState) => state.diagram.diagramData);


    const dispatch = useDispatch();

    if (sessionStatus === "unauthenticated") {
        redirect("/dashboard");
    }

    const onSave = async () => {
        console.log(editorData);
        console.log(diagramData);
        await fetchData({
            fileName,
            editorData,
            diagramData
        })

        // saveEditor();
        // saveExcalidrawState();
    }
  return (
    <div className='p-3 gap-10 flex justify-between items-center'>
      <div className='flex pr-20 border-b items-center'>
        {/*<Image src={'/logo-1.png'}*/}
        {/*  alt='logo'*/}
        {/*  height={40}*/}
        {/*  width={40} />*/}
        <input
            className="bg-black outline-none"
            placeholder="Enter File Name"
            value={fileName}
            onChange={(e) => dispatch(setFileName({ data: e.target.value }))} />
      </div>
      <div className='flex items-center gap-4'>
        <Button
          className='h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600'
          onClick={()=>onSave()}
        >
          <Save className='h-4 w-4' /> Save </Button>
        <Button
          className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'
        >
          Share <Link className='h-4 w-4' /> </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader