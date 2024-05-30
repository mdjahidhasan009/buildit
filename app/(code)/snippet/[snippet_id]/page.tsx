'use client';

import Editor from "../../components/Editor";
import { useSession } from "next-auth/react";
import useApi from "@/utils/useApi";
import {useEffect, useState} from "react";
import Loading from "@/app/(code)/snippet/[snippet_id]/loading";
import {setAppState} from "@/lib/features/snippet/snippetSlice";
import { useDispatch } from "@/lib/reduxStore";
import {ISnippet} from "@/app/(code)/constants/Snippet";

interface Session {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    id: string | null
  }
  expires: string
}

const Page = ({ params }: { params: { snippet_id: string } }) => {
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: rawData, loading, error } = useApi(`/api/v1/snippets/${params.snippet_id}`);
  const { data: session, status } = useSession();
  const data = rawData as ISnippet | null;

  useEffect(() => {
    if(data) {
      dispatch(setAppState(data as ISnippet));
      const userId = (session as Session)?.user?.id; //at next-auth already have issue but not fixed yet https://github.com/nextauthjs/next-auth/issues/7132
      setIsEditable(userId === data?.userId);
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
              views={data?.viewCount}
              editable={isEditable}
              isAuthenticated={isAuthenticated}
            />
          )
      }
    </>
  );
}

export default Page;