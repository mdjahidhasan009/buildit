"use client";

import CreateComponent from "../CreateComponent.tsx";
import {useContext} from "react";
import {DesignContext} from "@/contexts/DesignProvider.tsx";

const DesignPlayground = () => {
  const { components, currentComponent, removeComponent } = useContext(DesignContext);

  return (
    <div
      className={`flex justify-center relative items-center h-full ${!currentComponent ? 'w-full' : 'w-[calc(100%-250px)] overflow-hidden'}`}>
      <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
        <div id='main_design' className='w-auto relative h-auto overflow-hidden'>
          {
            components.map((component, index) => (
              <CreateComponent
                key={index}
                info={component}
                currentComponent={currentComponent}
                removeComponent={removeComponent}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default DesignPlayground;