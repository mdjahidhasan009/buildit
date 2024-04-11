"use client";

import {useEffect} from "react";
import useApi from "@/utils/useApi";
import SideBar from "@/components/main/SideBar";
import SideBarDrawer from "@/components/main/SideBarDrawer";
import DesignPlayground from "@/components/main/DesignPlayground";
import ComponentPropertiesPanel from "@/components/main/ComponentPropertiesPanel";
import RotateLoader from "react-spinners/RotateLoader";
import {useDispatch} from "react-redux";
import {setComponents} from "@/lib/features/components/componentsSlice";
import {AppDispatch} from "@/lib/reduxStore";

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
    <div className="min-w-screen h-full bg-black">
      {loading ? (
        <div className='left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute'>
            <RotateLoader color='white' />
        </div>
      ) : (
        <div className='flex h-full w-screen'>
          <SideBar/>
          <div className='h-full w-[calc(100%-75px)]'>
            <SideBarDrawer design_id={design_id}/>
            <div className='w-full flex h-full'>
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