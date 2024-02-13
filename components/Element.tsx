import {BsArrowsMove} from "react-icons/bs";

const Element = ({ elementWrapperDivRef, info, extraElementRef }) => {
  return (
    <>
      {
        extraElementRef?.current
          ? <>
            <div
              onMouseDown={(e) => { e.stopPropagation(); info.resizeElement(extraElementRef, info)}}
              className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => { e.stopPropagation(); info.resizeElement(extraElementRef, info)}}
              className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => { e.stopPropagation(); info.resizeElement(extraElementRef, info)}}
              className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
          </>
          : <>
            <div
              onMouseDown={(e) => { e.stopPropagation(); info.resizeElement(elementWrapperDivRef, info)}}
              className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => { e.stopPropagation(); info.resizeElement(elementWrapperDivRef, info)}}
              className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => { e.stopPropagation(); info.resizeElement(elementWrapperDivRef, info)}}
              className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
          </>
      }
      {/*<div*/}
      {/*  onMouseDown={(e) => { e.stopPropagation(); info.rotateElement(id, info) }}*/}
      {/*  className='hidden absolute group-hover:block -top-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>*/}

      <div className="absolute -top-[3px] -left-[3px] hidden group-hover:block">
        <div
          onMouseDown={(e) => { e.stopPropagation(); info.rotateElement(elementWrapperDivRef, info) }}
            className="w-[15px] h-[15px] bg-green-500 z-[9999] flex justify-center items-center">
          <BsArrowsMove className="text-white" /> {/* Rotate icon */}
        </div>
      </div>

      {/*<div*/}
      {/*  onMouseDown={() => info.moveElement(id, info)}*/}
      {/*  className='hidden absolute group-hover:block -top-[3px] left-[50%] translate-[-50%, 0%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>*/}
      {/*<div*/}
      {/*  onMouseDown={() => info.moveElement(id, info)}*/}
      {/*  className='hidden absolute group-hover:block top-[50%] -left-[3px] translate-[-0%, 50%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>*/}
      {/*<div*/}
      {/*  onMouseDown={() => info.moveElement(id, info)}*/}
      {/*  className='hidden absolute group-hover:block top-[50%] -right-[3px] translate-[-0%, 50%]  w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>*/}
      {/*<div*/}
      {/*  onMouseDown={() => info.moveElement(id, info)}*/}
      {/*  className='hidden absolute group-hover:block -bottom-[3px] left-[50%] translate-[-50%, 0%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>*/}
    </>
  )
}

export default Element;