"use client";

import {useEffect} from "react";
import useApi from "@/utils/useApi";
import SideBar from "@/app/(design)/components/SideBar";
import SideBarDrawer from "@/app/(design)/components/SideBarDrawer";
import DesignPlayground from "@/app/(design)/components/DesignPlayground";
import ComponentPropertiesPanel from "@/app/(design)/components/ComponentPropertiesPanel/ComponentPropertiesPanel";
import RotateLoader from "react-spinners/RotateLoader";
import { useDispatch } from "@/lib/reduxStore";
import {setComponents} from "@/lib/features/components/componentsSlice";
import {AppDispatch} from "@/lib/reduxStore";
import {cn} from "@/lib/cn";

type Props = {
  params: {
    design_id: string
  }
}

const Page = ({ params } : Props) => {
  const  design_id  = params?.design_id || '';
  const { data, loading } = useApi(`api/v1/designs/user/${design_id}`);
  const dispatch: AppDispatch  = useDispatch();

  useEffect(() => {
    if(data?.data?.design) {
      dispatch(setComponents(data.data.design));
    }
  }, [data, design_id]);

  return (
    <div className="min-w-full h-full bg-black">
      {loading ? (
        <div className='left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute'>
            <RotateLoader color='white' />
        </div>
      ) : (
        <div className='flex h-full w-screen'>
          <SideBar />
          <div className='h-full w-[calc(100%-75px)]'>
            <SideBarDrawer design_id={design_id}/>
            <div className={
              cn(
                "w-full flex h-full",
                "flex-col-reverse lg:flex-row"
              )}
            >
              <DesignPlayground/>
              <ComponentPropertiesPanel/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;