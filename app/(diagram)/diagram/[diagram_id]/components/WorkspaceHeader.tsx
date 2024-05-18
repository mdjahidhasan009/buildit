import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "@/lib/reduxStore";
import {setTittle} from "@/lib/features/diagram/diagramSlice";
import useApi from "@/utils/useApi";
import {useSession} from "next-auth/react";
import {redirect, usePathname} from "next/navigation";

function WorkspaceHeader() {
    const pathname = usePathname();
    const diagramId = pathname.split('/diagram/')[1];
    const { data, fetchData, loading } = useApi(`/api/v1/diagrams`, 'PATCH');
    const { data: session, status: sessionStatus } = useSession();

    const title = useSelector((state: RootState) => state.diagram.title);
    const editorData = useSelector((state: RootState) => state.diagram.editorData);
    const diagramData = useSelector((state: RootState) => state.diagram.diagramData);


    const dispatch = useDispatch();

    if (sessionStatus === "unauthenticated") {
        redirect("/dashboard");
    }

    const onSave = async () => {
        await fetchData({
            id: diagramId,
            title,
            editorData,
            diagramData
        })

        // saveEditor();
        // saveExcalidrawState();
    }
  return (
    <div className='p-3 gap-2 md:gap-10 flex justify-between items-center'>
      <div className='flex pr-0 md:pr-20 border-b items-center'>
        {/*<Image src={'/logo-1.png'}*/}
        {/*  alt='logo'*/}
        {/*  height={40}*/}
        {/*  width={40} />*/}
        <input
            className="bg-black outline-none"
            placeholder="Enter File Name"
            value={title}
            onChange={(e) => dispatch(setTittle({ data: e.target.value }))} />
      </div>
      <div className='flex items-center gap-4'>
        <Button
          // className='h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600'
          className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'
          onClick={()=>onSave()}
        >
          <Save className='h-4 w-4 pr-1' /> Save </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader