"use client";

import CreateComponent from "@/app/(design)/components/CreateComponent/CreateComponent";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/reduxStore";

const DesignPlayground = () => {
  const components = useSelector((state: RootState) => state.components.components);
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);

  return (
    <div
      className={`flex justify-center relative items-center h-full ${!currentComponent ? 'w-full' : 'w-full lg:w-[calc(100%-250px)] overflow-hidden'}`}>
      <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
        <div id='main_design' className='w-auto relative h-auto overflow-hidden'>
          {
            components.map((component, index) => (
              <CreateComponent
                key={index}
                component={component}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default DesignPlayground;