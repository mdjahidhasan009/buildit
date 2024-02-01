"use client";

// import Header from "@/components/Header.tsx";
import {useContext, useEffect} from "react";
// import {useParams} from "react-router-dom";
import useApi from "@/utils/useApi.ts";
import SideBar from "@/components/main/SideBar.tsx";
import {DesignContext} from "@/contexts/DesignProvider.tsx";
import SideBarDrawer from "@/components/main/SideBarDrawer.tsx";
import DesignPlayground from "@/components/main/DesignPlayground.tsx";
import ComponentPropertiesPanel from "@/components/main/ComponentPropertiesPanel.tsx";
import {useParams} from "next/navigation";
import axios from "axios";

type Props = {
  params: {
    design_id: string
  }
}

const Page = ({ params } : Props) => {
  const  design_id  = params?.design_id || '';
  const { data, error } = useApi(`api/v1/design/user-design/${design_id}`, 'GET');


  const { setCurrentComponent, components, setComponents, moveElement, resizeElement, rotateElement, removeBackground }
    = useContext(DesignContext);

  useEffect(() => {
    const getDesign = async () => {
      try {
        if(!data) return;

        const { design } = data?.data;

        for(let i = 0; i < design.length; i++) {
          design[i].setCurrentComponent = (a) => setCurrentComponent(a);
          design[i].moveElement = moveElement;
          design[i].resizeElement = resizeElement;
          design[i].rotateElement = rotateElement;
          design[i].removeBackground = removeBackground;
        }
        setComponents(design);
      } catch (e) {
        console.log(e);
      }
    }

    getDesign();
  }, [data, design_id]);

  // useEffect(() => {
  //     console.log('string useEffect');
  //     if(data) {
  //       const { design } = data?.data;
  //
  //       for(let i = 0; i < design.length; i++) {
  //         design[i].setCurrentComponent = (a) => setCurrentComponent(a);
  //         design[i].moveElement = moveElement;
  //         design[i].resizeElement = resizeElement;
  //         design[i].rotateElement = rotateElement;
  //         design[i].removeBackground = removeBackground;
  //       }
  //       setComponents(design);
  //     }
  //     // const getDesign = async () => {
  //     //   try {
  //     //     console.log('start ing api');
  //     //     const { data } = await useApi(`/design/user-design/${design_id}`, 'GET');
  //     //     debugger
  //     //     console.log('end ing api')
  //     //     console.log(data);
  //     //
  //     //
  //     //     const { design } = data?.data;
  //     //
  //     //     for(let i = 0; i < design.length; i++) {
  //     //       design[i].setCurrentComponent = (a) => setCurrentComponent(a);
  //     //       design[i].moveElement = moveElement;
  //     //       design[i].resizeElement = resizeElement;
  //     //       design[i].rotateElement = rotateElement;
  //     //       design[i].removeBackground = removeBackground;
  //     //     }
  //     //     setComponents(design);
  //     //   } catch (e) {
  //     //     console.log(e);
  //     //   }
  //     // }
  //
  //     console.log('after get design')
  //     // getDesign();
  //     console.log('after get design')
  //   }, [data, error, design_id]);

  return (
    <div className="min-w-screen h-screen bg-black">
      {/*<Header components={components} design_id={design_id} />*/}
      <div className='flex h-[calc(100%-60px)] w-screen'>
        <SideBar/>
        <div className='h-full w-[calc(100%-75px)]'>
          <SideBarDrawer />
          <div className='w-full flex h-full'>
            <DesignPlayground />
            <ComponentPropertiesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;