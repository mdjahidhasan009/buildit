import { BsArrowsMove } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateComponentRotation, updateComponentSize } from "@/lib/features/components/componentsSlice";
import { AppDispatch, RootState } from "@/lib/reduxStore";
import { IComponent } from "@/lib/features/components/IComponent";
import { isMobileDevice } from "@/lib/utils";
import useRotate from "@/app/(design)/business/hooks/useRotate";
import { useEffect, useRef } from "react";
import useResize from "@/app/(design)/business/hooks/useResize";

interface ElementProps {
  elementWrapperDivRef: React.RefObject<HTMLElement>;
  component: IComponent;
  extraElementRef?: React.RefObject<HTMLElement>;
}

const Element: React.FC<ElementProps> = ({ elementWrapperDivRef, component, extraElementRef = null }) => {
  const dispatch  = useDispatch<AppDispatch>();
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);
  const rotateIconRef = useRef(null);
  const resizeIconExtraElementBottomRightRef = useRef(null);
  const elementWrapperDivRefBottomLeftRef = useRef(null);

  // const { rotation } = useRotate(elementWrapperDivRef, rotateIconRef, component);
  const activeRef: React.RefObject<HTMLElement> = extraElementRef?.current ? extraElementRef : elementWrapperDivRef;
  console.log('****************************************************************************************************')
  useResize(activeRef, resizeIconExtraElementBottomRightRef, component);
  useResize(activeRef, elementWrapperDivRefBottomLeftRef, component);
  // useResize(activeRef, resizeIconExtraElementBottomLeftRef, component);

  // useEffect(() => {
  //   dispatch(updateComponentRotation({ id: component.id, rotate: rotation }));
  // }, [component.id, dispatch, rotation]);

  // const handleResize = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, elementRef: React.RefObject<HTMLElement>) => {
  //   event.stopPropagation();
  //   if (!elementRef.current) return;
  //
  //   let isResizing = true;
  //   let initialMouseX = 0;
  //   let initialMouseY = 0;
  //
  //   if (event.type.startsWith('touch')) {
  //     initialMouseX = (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
  //     initialMouseY = (event as React.TouchEvent<HTMLDivElement>).touches[0].clientY;
  //   } else {
  //     initialMouseX = (event as React.MouseEvent<HTMLDivElement>).clientX;
  //     initialMouseY = (event as React.MouseEvent<HTMLDivElement>).clientY;
  //   }
  //   const initialDimensions = elementRef.current.getBoundingClientRect();
  //
  //   const moveMouse = (e: MouseEvent | TouchEvent) => {
  //     event.stopPropagation();
  //     if (!isResizing || !elementRef.current) return;
  //
  //     let currentX = 0;
  //     let currentY = 0;
  //
  //     if (e.type.startsWith('touch')) {
  //       currentX = (e as TouchEvent).touches[0].clientX;
  //       currentY = (e as TouchEvent).touches[0].clientY;
  //     } else {
  //       currentX = (e as MouseEvent).clientX;
  //       currentY = (e as MouseEvent).clientY;
  //     }
  //
  //     const dx = currentX - initialMouseX;
  //     const dy = currentY - initialMouseY;
  //
  //     // Determine the dimension change based on shape type
  //     let newWidth, newHeight;
  //     if (component?.type === 'circle') {
  //       // For circles, use the maximum change in either direction to keep aspect ratio
  //       const delta = Math.max(dx, dy);
  //       newWidth = newHeight = initialDimensions.width + delta;
  //     } else {
  //       // For other shapes, width and height can change independently
  //       newWidth = initialDimensions.width + dx;
  //       newHeight = initialDimensions.height + dy;
  //     }
  //
  //     // Directly manipulating styles for visual feedback during resize
  //     elementRef.current.style.width = `${newWidth}px`;
  //     elementRef.current.style.height = `${newHeight}px`;
  //
  //     const finalWidth = elementRef.current.offsetWidth;
  //     const finalHeight = elementRef.current.offsetHeight;
  //     dispatch(updateComponentSize({ id: component?.id, width: finalWidth, height: finalHeight }));
  //   };
  //
  //   const mouseUp = () => {
  //     isResizing = false;
  //     document.removeEventListener('mousemove', moveMouse);
  //     document.removeEventListener('touchmove', moveMouse);
  //     document.removeEventListener('mouseup', mouseUp);
  //     document.removeEventListener('touchend', mouseUp);
  //   };
  //
  //   document.addEventListener('mousemove', moveMouse);
  //   document.addEventListener('touchmove', moveMouse);
  //   document.addEventListener('touchend', mouseUp);
  //   document.addEventListener('mouseup', mouseUp);
  //
  // };

  const willShow = () => {
    const isMobile = isMobileDevice();

    if(isMobile) {
      if(currentComponent?.id == component?.id) {
        return " block "
      }
    }

    return " hidden group-hover:block "
  }

  return (
    <>
      {
        extraElementRef?.current
          ? <>
            <div
              // onTouchStart={(e) => handleResize(e, extraElementRef)}
              // onMouseDown={(e) => handleResize(e, extraElementRef)}
              ref={resizeIconExtraElementBottomRightRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
            <div
              // onTouchStart={(e) => handleResize(e, extraElementRef)}
              // onMouseDown={(e) => handleResize(e, extraElementRef)}
              // ref={resizeIconRef}
              // className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[50px] h-[50px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
            <div
              // onTouchStart={(e) => handleResize(e, extraElementRef)}
              // onMouseDown={(e) => handleResize(e, extraElementRef)}
              // ref={resizeIconExtraElementBottomLeftRef}
              // className={`no-drag ${willShow()} absolute -bottom-[3px] -left-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            >
            </div>
          </>
          : <>
            <div
              // onMouseDown={(e) => { e.stopPropagation(); component.resizeElement(elementWrapperDivRef, component)}}
              // onTouchStart={(e) => handleResize(e, elementWrapperDivRef)}
              // onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              // ref={resizeIconRef}
              // className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
              ></div>
            <div
              // onTouchStart={(e) => handleResize(e, elementWrapperDivRef)}
              // onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              // ref={resizeIconRef}
              // className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}
            ></div>
            <div
              // onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              // onTouchStart={(e) => handleResize(e, elementWrapperDivRef)}
              ref={elementWrapperDivRefBottomLeftRef}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -left-[3px] w-[15px] h-[15px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
          </>
      }

      <div className={`absolute -top-[3px] -left-[3px] no-drag ${willShow()} z-[9999]`}>
        <div
          ref={rotateIconRef}
          className="w-[15px] h-[15px] bg-green-500 z-[9999] flex justify-center items-center">
          <BsArrowsMove className="text-white"/> {/* Rotate icon */}
        </div>
      </div>
    </>
  )
}

export default Element;