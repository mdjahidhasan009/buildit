"use client";

import { BsTrash } from "react-icons/bs";
import Element from "./Element";
import {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reduxStore";
import {
  removeComponent,
  setCurrentComponent,
  updateComponentPosition
} from "@/lib/features/components/componentsSlice";
import { IComponent } from "@/lib/features/components/IComponent";
import Image from 'next/image';
import useDragger from "@/app/(design)/business/hooks/useDragger";

const CreateComponent = ({ component } : { component: IComponent }) => {

  const randValue = Math.floor(Math.random() * 100);
  let html: React.JSX.Element = <div></div>;

  const elementWrapperDivRef = useRef(null);
  const extraElementRef = useRef(null);

  const dispatch: AppDispatch = useDispatch();
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);

  const { currentXAxis, currentYAxis } = useDragger(elementWrapperDivRef, component);

  const handleRemoveComponent = (id: number) => {
    dispatch(removeComponent(id));
  };

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const handleSetCurrentComponent = (component: IComponent) => {
    if(!isTouchDevice) {
      dispatch(setCurrentComponent(component));
    }
  }

  useEffect(() => {
    dispatch(updateComponentPosition({ id: component.id, left: currentXAxis, top: currentYAxis }));
  }, [component.id, currentXAxis, currentYAxis, dispatch]);

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
          component.image &&
            <Image
                fill
                objectFit="fill"
                className="w-full h-full pointer-events-none select-none"
                src={component.image}
                alt="img"
            />
        }
    </div>
  }

  if(component.name === 'shape' && component.type === 'rect') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
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
        <Element elementWrapperDivRef={elementWrapperDivRef} component={component} />
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
        <Element elementWrapperDivRef={elementWrapperDivRef} component={component} />
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
          <Image
              fill
              objectFit="fill"
              className='w-full h-full pointer-events-none select-none'
              src={component.image}
              alt="image"
          />
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