"use client";

import {useContext, useEffect} from "react";
import useApi from "@/utils/useApi.ts";
import SideBar from "@/components/main/SideBar.tsx";
import {DesignContext} from "@/contexts/DesignProvider.tsx";
import SideBarDrawer from "@/components/main/SideBarDrawer.tsx";
import DesignPlayground from "@/components/main/DesignPlayground.tsx";
import ComponentPropertiesPanel from "@/components/main/ComponentPropertiesPanel.tsx";
import RotateLoader from "react-spinners/RotateLoader";

type Props = {
  params: {
    design_id: string
  }
}

const Page = ({ params } : Props) => {
  const  design_id  = params?.design_id || '';
  const { data, loading } = useApi(`api/v1/design/user/${design_id}`);


  const { setCurrentComponent, components, setComponents, moveElement, resizeElement, rotateElement, removeBackground }
    = useContext(DesignContext);

  useEffect(() => {
    if(data?.data?.design) {
      const enhancedComponents = data.data.design.map((design) => {
        design.setCurrentComponent = (a) => setCurrentComponent(a);
        design.moveElement = moveElement;
        design.resizeElement = resizeElement;
        design.rotateElement = rotateElement;
        design.removeBackground = removeBackground;
        return design;
      });
      setComponents(enhancedComponents);
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