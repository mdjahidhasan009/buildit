'use client';

import Editor from "@/components/Editor";
import { useSession } from "next-auth/react";
import useApi from "@/utils/useApi";
import {useStore} from "@/lib/store";
import {useEffect, useState} from "react";
import Loading from "@/app/(withlayout)/[snippet_id]/loading";

const page = ({ params }: { params: { snippet_id: string } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, loading, error } = useApi(`/api/v1/snippets/${params.snippet_id}`);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(data && session) {
      useStore.getState().setAppState(data);
      setIsEditable(session?.user?.id === data?.userId);
      setIsAuthenticated(!!session);
    }
  }, [data, session]);


  return (
    <>
      {
        loading
          ? <Loading />
          : (
            <Editor
              views={data?.views?.count | 0}
              editable={isEditable}
              isAuthenticated={isAuthenticated}
            />
          )
      }
    </>
  );
}

export default page;