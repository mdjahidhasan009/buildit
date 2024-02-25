"use client";

import {BsTrash} from "react-icons/bs";
import Element from "./Element";
import { useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/reduxStore";
import {
  removeComponent,
  setCurrentComponent,
  updateComponentPosition
} from "@/lib/features/components/componentsSlice";

const CreateComponent = ({ component }) => {
  const randValue = Math.floor(Math.random() * 100);
  let html: React.JSX.Element = <div></div>;

  const elementWrapperDivRef = useRef(null);
  const extraElementRef = useRef(null);

  const dispatch: AppDispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);
  const currentComponentId = currentComponent?.id;

  const handleRemoveComponent = (id: number) => {
    dispatch(removeComponent(id));
  };

  const handleSetCurrentComponent = (component) => {
    dispatch(setCurrentComponent(component));
  }

  const moveElement = (componentRef) => {
    let isMoving = true;
    const currentDiv = componentRef.current;
    if(!currentDiv) return;

    const moveMouse = (e) => {
      let newLeft = 0, newTop = 0;
      const { movementX, movementY } = e;
      const getStyle = window.getComputedStyle(componentRef.current);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if(isMoving) {
        componentRef.current.style.left = `${left + movementX}px`;
        componentRef.current.style.top = `${top + movementY}px`;
        newLeft = left + movementX;
        newTop = top + movementY;
        dispatch(updateComponentPosition({ id: component.id, left: newLeft, top: newTop }));
        // debounce(() => {
        //   dispatch(updateComponentPosition({ id: component.id, left: newLeft, top: newTop }));
        // }, 100);
      }
    }

    const mouseUp = (e) => {
      isMoving = false;
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
      // setLeft(parseInt(currentDiv.style.left));
      // setTop(parseInt(currentDiv.style.top));
    }

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', mouseUp);
  }


  if(component.name === 'main_frame') {
    html =
      <div
        onClick={() => handleSetCurrentComponent(component)}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: component.width + 'px',
          height: component.height + 'px',
          background: component.color,
          zIndex: component.zIndex,
        }}
      >
        {
          component.image && <img className="w-full h-full" src={component.image} alt="img" />
        }
    </div>
  }

  if(component.name === 'shape' && component.type === 'rect') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); moveElement(elementWrapperDivRef) }}
        onClick={() => handleSetCurrentComponent(component)}
        style={{
          width: component.width + 'px',
          height: component.height + 'px',
          background: component.color,
          opacity: component.opacity,
          left: component.left + 'px',
          top: component.top + 'px',
          zIndex: component.zIndex,
          transform: component.rotate ? `rotate(${component.rotate}deg)` : `rotate(0deg)`,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} component={component} exId="" />
        {currentComponent?.id === component.id &&
            <div
                onClick={() => handleRemoveComponent(component.id)}
                className='px-3 py-2 bg-white absolute top-10 hidden group-hover:block cursor-pointer rounded-md'>
                  <BsTrash />
            </div>
        }
      </div>
  }

  if(component.name === 'shape' && component.type === 'circle') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); moveElement(elementWrapperDivRef) }}
        onClick={() => handleSetCurrentComponent(component)}
        style={{
          left: component.left + 'px',
          top: component.top + 'px',
          zIndex: component.zIndex,
          transform: component.rotate ? `rotate(${component.rotate}deg)` : `rotate(0deg)`,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} component={component} extraElementRef={extraElementRef} />
        <div
          id={`${randValue}c`}
          ref={extraElementRef}
          className='rounded-full'
          style={{
            width: component.width + 'px',
            height: component.width + 'px',
            background: component.color,
            opacity: component.opacity,
          }}
        >

        </div>
        {currentComponent?.id === component.id &&
            <div
                onClick={() => handleRemoveComponent(component.id)}
                className='px-3 py-2 bg-white absolute top-10 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash />
            </div>
        }
      </div>
  }

  if(component.name === 'shape' && component.type === 'trangle') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); moveElement(elementWrapperDivRef) }}
        onClick={() => handleSetCurrentComponent(component)}
        style={{
          left: component.left + 'px',
          top: component.top + 'px',
          zIndex: component.zIndex,
          transform: component.rotate ? `rotate(${component.rotate}deg)` : `rotate(0deg)`,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} component={component} extraElementRef={extraElementRef} />
        <div
          id={`${randValue}t`}
          ref={extraElementRef}
          style={{
            width: component.width + 'px',
            height: component.height + 'px',
            background: component.color,
            opacity: component.opacity,
            clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
          }}
        >

        </div>
        {currentComponent?.id === component.id &&
            <div
                onClick={() => handleRemoveComponent(component.id)}
                className='px-3 py-2 bg-white absolute top-10 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash />
            </div>
        }
      </div>
  }

  if(component.name === 'text') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); moveElement(elementWrapperDivRef) }}
        onClick={() => handleSetCurrentComponent(component)}
        style={{
          left: component.left + 'px',
          top: component.top + 'px',
          zIndex: component.zIndex,
          transform: component.rotate ? `rotate(${component.rotate}deg)` : `rotate(0deg)`,
          padding: component.padding + 'px',
          color: component.color,
          opacity: component.opacity,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} component={component} exId=''/>
        <h2 style={{ fontSize: component.fontSize + 'px', fontWeight: component.fontWeight }} className='w-full h-full'>{component?.title}</h2>
        {currentComponent?.id === component.id &&
            <div
                onClick={() => handleRemoveComponent(component.id)}
                className='px-3 py-2 bg-white absolute top-10 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash/>
            </div>
        }
      </div>
  }

  if(component.name === 'image') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); moveElement(elementWrapperDivRef) }}
        onClick={() => handleSetCurrentComponent(component)}
        style={{
          left: component.left + 'px',
          top: component.top + 'px',
          zIndex: component.zIndex,
          transform: component.rotate ? `rotate(${component.rotate}deg)` : `rotate(0deg)`,
          opacity: component.opacity,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element
          elementWrapperDivRef={elementWrapperDivRef}
          component={component}
          extraElementRef={extraElementRef}
        />
        <div
          id={`${randValue}img`}
          ref={extraElementRef}
          className='overflow-hidden'
          style={{
            width: component.width + 'px',
            height: component.height + 'px',
            borderRadius: `${component.radius}%`,
          }}>
          <img className='w-full h-full' src={component.image} alt="image"/>
        </div>
        {currentComponent?.id === component.id &&
            <div
                onClick={() => handleRemoveComponent(component.id)}
                className='px-3 py-2 bg-white absolute top-10 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash/>
            </div>
        }
      </div>
  }

  return html;
}

export default CreateComponent;