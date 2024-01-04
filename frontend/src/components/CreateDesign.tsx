import React, {useRef} from 'react';
import { useLocation } from "react-router-dom";
import CreateComponent from "./CreateComponent.tsx";

const CreateDesign = () => {
  const ref = useRef();
  const { state } = useLocation();

  const obj = {
    name: "main_frame",
    type: "rect",
    id: Math.floor(Math.random() * 100 + 1),
    height: state.height,
    width: state.width,
    z_index: 1,
    color: 'green',
    img: ""
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="relative w-auto h-auto overflow-auto">
        <CreateComponent info={obj} current_component={{}}/>
      </div>
    </div>
  )
};

export default CreateDesign;