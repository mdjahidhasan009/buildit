"use client";

import {BsTrash} from "react-icons/bs";
import Element from "./Element";
import {useRef} from "react";

const CreateComponent = ({ info, currentComponent, removeComponent }) => {
  const randValue = Math.floor(Math.random() * 100);
  let html: React.JSX.Element = <div></div>;
  const elementWrapperDivRef = useRef(null);
  const extraElementRef = useRef(null);

  if(info.name === 'main_frame') {
    html =
      <div
        onClick={() => info.setCurrentComponent(info)}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: info.width + 'px',
          height: info.height + 'px',
          background: info.color,
          zIndex: info.zIndex,
        }}
      >
        {
          info.image && <img className="w-full h-full" src={info.image} alt="img" />
        }
    </div>
  }

  if(info.name === 'shape' && info.type === 'rect') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); info.moveElement(elementWrapperDivRef, info) }}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.width + 'px',
          height: info.height + 'px',
          background: info.color,
          opacity: info.opacity,
          left: info.left + 'px',
          top: info.top + 'px',
          zIndex: info.zIndex,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} info={info} exId="" />
        {currentComponent?.id === info.id &&
            <div
                onClick={() => removeComponent(info.id)}
                className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                  <BsTrash />
            </div>
        }
      </div>
  }

  if(info.name === 'shape' && info.type === 'circle') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); info.moveElement(elementWrapperDivRef, info) }}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + 'px',
          top: info.top + 'px',
          zIndex: info.zIndex,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} info={info} extraElementRef={extraElementRef} />
        <div
          id={`${randValue}c`}
          ref={extraElementRef}
          className='rounded-full'
          style={{
            width: info.width + 'px',
            height: info.width + 'px',
            background: info.color,
            opacity: info.opacity,
          }}
        >

        </div>
        {currentComponent?.id === info.id &&
            <div
                onClick={() => removeComponent(info.id)}
                className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash />
            </div>
        }
      </div>
  }

  if(info.name === 'shape' && info.type === 'trangle') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); info.moveElement(elementWrapperDivRef, info) }}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + 'px',
          top: info.top + 'px',
          zIndex: info.zIndex,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} info={info} extraElementRef={extraElementRef} />
        <div
          id={`${randValue}t`}
          ref={extraElementRef}
          style={{
            width: info.width + 'px',
            height: info.height + 'px',
            background: info.color,
            opacity: info.opacity,
            clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
          }}
        >

        </div>
        {currentComponent?.id === info.id &&
            <div
                onClick={() => removeComponent(info.id)}
                className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash />
            </div>
        }
      </div>
  }
  if(info.name === 'text') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); info.moveElement(elementWrapperDivRef, info) }}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + 'px',
          top: info.top + 'px',
          zIndex: info.zIndex,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          padding: info.padding + 'px',
          color: info.color,
          opacity: info.opacity,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element elementWrapperDivRef={elementWrapperDivRef} info={info} exId=''/>
        <h2 style={{ fontSize: info.fontSize + 'px', fontWeight: info.fontWeight }} className='w-full h-full'>{info?.title}</h2>
        {currentComponent?.id === info.id &&
            <div
                onClick={() => removeComponent(info.id)}
                className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash/>
            </div>
        }
      </div>
  }

  if(info.name === 'image') {
    html =
      <div
        ref={elementWrapperDivRef}
        id={randValue.toString()}
        onMouseDown={(e) => { e.stopPropagation(); info.moveElement(elementWrapperDivRef, info) }}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + 'px',
          top: info.top + 'px',
          zIndex: info.zIndex,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          opacity: info.opacity,
          cursor: "move"
        }}
        className='absolute group hover:border-[2px] hover:border-indigo-500'
      >
        <Element
          elementWrapperDivRef={elementWrapperDivRef}
          info={info}
          extraElementRef={extraElementRef}
        />
        <div
          id={`${randValue}img`}
          ref={extraElementRef}
          className='overflow-hidden'
          style={{
            width: info.width + 'px',
            height: info.height + 'px',
            borderRadius: `${info.radius}%`,
          }}>
          <img className='w-full h-full' src={info.image} alt="image"/>
        </div>
        {currentComponent?.id === info.id &&
            <div
                onClick={() => removeComponent(info.id)}
                className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
              <BsTrash/>
            </div>
        }
      </div>
  }

  return html;
}

export default CreateComponent;