import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import Element from "../Element";
import { BsTrash } from "react-icons/bs";
import {IComponent} from "@/lib/features/components/IComponent";
import { RootState} from "@/lib/reduxStore";
import useDragger from "@/app/(design)/business/hooks/useDragger";
import useComponentActions from "@/app/(design)/components/CreateComponent/hooks/useComponentActions";

const ShapeComponent = ({ component } : { component: IComponent }) => {
  const elementWrapperDivRef = useRef(null);
  const extraElementRef = useRef(null);
  const { handleSetCurrentComponent, handleRemoveComponent } = useComponentActions(component);

  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);
  useDragger(elementWrapperDivRef, component);

  const shapeStyle = {
    width: component.type === 'rect' ? `${component.width}px` : 'auto',
    height: component.type === 'rect' ? `${component.height}px` : 'auto',
    background: `${component.type === 'rect' ? component.color : ""}`,
    opacity: component.opacity,
    left: `${component.left}px`,
    top: `${component.top}px`,
    zIndex: component.zIndex,
    transform: `rotate(${component.rotate || 0}deg)`,
    cursor: "move"
  };

  return (
    <div
      ref={elementWrapperDivRef}
      id={`shape-${component.id}`}
      onClick={handleSetCurrentComponent}
      style={shapeStyle}
      className='absolute group hover:border-[2px] hover:border-indigo-500'
    >
      <Element
        elementWrapperDivRef={elementWrapperDivRef}
        component={component}
        extraElementRef={extraElementRef}
      />

      {(component.type === 'circle' || component.type === 'trangle') && (
        <div
          ref={extraElementRef}
          className={`${component.type === 'circle' ? "rounded-full" : ""}`}
          style={{
            width: component.width + 'px',
            height: component.type === 'circle' ? component.width + 'px' : component.height + 'px',
            background: component.color,
            opacity: component.opacity,
            ...component.type === 'trangle' && {
              clipPath: 'polygon(50% 0%, 100% 100%, 0 100%)'
            }
          }}
        />
      )}

      {currentComponent?.id === component.id &&
        <div
          onClick={handleRemoveComponent}
          className='px-3 py-2 bg-white absolute top-10 hidden group-hover:block cursor-pointer rounded-md'>
          <BsTrash/>
        </div>
      }
    </div>
  );
};

export default ShapeComponent;
