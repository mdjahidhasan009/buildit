import { BsArrowsMove } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateComponentRotation, updateComponentSize } from "@/lib/features/components/componentsSlice";
import { AppDispatch, RootState } from "@/lib/reduxStore";
import { IComponent } from "@/lib/features/components/IComponent";
import {isMobileDevice} from "@/lib/utils";

interface ElementProps {
  elementWrapperDivRef: React.RefObject<HTMLElement>;
  component: IComponent;
  extraElementRef?: React.RefObject<HTMLElement>;
}

const Element: React.FC<ElementProps> = ({ elementWrapperDivRef, component, extraElementRef = null }) => {
  const dispatch  = useDispatch<AppDispatch>();
  const currentComponent = useSelector((state: RootState) => state.components.currentComponent);

  const handleResize = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, elementRef: React.RefObject<HTMLElement>) => {
    event.stopPropagation();
    if (!elementRef.current) return;

    let isResizing = true;
    let initialMouseX = 0;
    let initialMouseY = 0;

    if (event.type.startsWith('touch')) {
      initialMouseX = (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
      initialMouseY = (event as React.TouchEvent<HTMLDivElement>).touches[0].clientY;
    } else {
      initialMouseX = (event as React.MouseEvent<HTMLDivElement>).clientX;
      initialMouseY = (event as React.MouseEvent<HTMLDivElement>).clientY;
    }
    const initialDimensions = elementRef.current.getBoundingClientRect();

    const moveMouse = (e: MouseEvent | TouchEvent) => {
      event.stopPropagation();
      if (!isResizing || !elementRef.current) return;

      let currentX = 0;
      let currentY = 0;

      if (e.type.startsWith('touch')) {
        currentX = (e as TouchEvent).touches[0].clientX;
        currentY = (e as TouchEvent).touches[0].clientY;
      } else {
        currentX = (e as MouseEvent).clientX;
        currentY = (e as MouseEvent).clientY;
      }

      const dx = currentX - initialMouseX;
      const dy = currentY - initialMouseY;

      // Determine the dimension change based on shape type
      let newWidth, newHeight;
      if (component?.type === 'circle') {
        // For circles, use the maximum change in either direction to keep aspect ratio
        const delta = Math.max(dx, dy);
        newWidth = newHeight = initialDimensions.width + delta;
      } else {
        // For other shapes, width and height can change independently
        newWidth = initialDimensions.width + dx;
        newHeight = initialDimensions.height + dy;
      }

      // Directly manipulating styles for visual feedback during resize
      elementRef.current.style.width = `${newWidth}px`;
      elementRef.current.style.height = `${newHeight}px`;

      const finalWidth = elementRef.current.offsetWidth;
      const finalHeight = elementRef.current.offsetHeight;
      dispatch(updateComponentSize({ id: component?.id, width: finalWidth, height: finalHeight }));
    };

    const mouseUp = () => {
      isResizing = false;
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('touchmove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('touchend', mouseUp);
    };

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('touchmove', moveMouse);
    document.addEventListener('touchend', mouseUp);
    document.addEventListener('mouseup', mouseUp);

  };


  const handleRotate = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, elementRef: React.RefObject<HTMLElement>) => {
    event.stopPropagation();
    if (!elementRef.current) return;

    let initialAngle = 0;
    // Assuming the element's center as the pivot for rotation
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Function to calculate the angle based on current mouse or touch position
    const calculateAngle = (pageX: number, pageY: number) => {
      const dx = pageX - centerX;
      const dy = pageY - centerY;
      return Math.atan2(dy, dx) * (180 / Math.PI);
    };


    if (event.type.startsWith('touch')) {
      const touchEvent = event as React.TouchEvent<HTMLDivElement>;
      initialAngle = calculateAngle(touchEvent.touches[0].pageX, touchEvent.touches[0].pageY);
    } else {
      const mouseEvent = event as React.MouseEvent<HTMLDivElement>;
      initialAngle = calculateAngle(mouseEvent.pageX, mouseEvent.pageY);
    }

    const moveMouse = (e: MouseEvent | TouchEvent) => {
      if (!elementRef.current) return;

      let currentAngle = 0;
      if (e.type.startsWith('touch')) {
        const touchMoveEvent = e as TouchEvent;
        currentAngle = calculateAngle(touchMoveEvent.touches[0].pageX, touchMoveEvent.touches[0].pageY);
      } else {
        const mouseMoveEvent = e as MouseEvent;
        currentAngle = calculateAngle(mouseMoveEvent.pageX, mouseMoveEvent.pageY);
      }

      let angleDiff = currentAngle - initialAngle;
      let newRotate = (angleDiff + 360) % 360; // Normalize the angle
      elementRef.current.style.transform = `rotate(${newRotate}deg)`;

      dispatch(updateComponentRotation({ id: component.id, rotate: newRotate }));
    };

    const stopRotate = () => {
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', stopRotate);
      document.removeEventListener('touchmove', moveMouse);
      document.removeEventListener('touchend', stopRotate);
    };

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', stopRotate);
    document.addEventListener('touchmove', moveMouse);
    document.addEventListener('touchend', stopRotate);

  };

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
              onTouchStart={(e) => handleResize(e, extraElementRef)}
              onMouseDown={(e) => handleResize(e, extraElementRef)}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[40px] h-[40px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
            <div
              onTouchStart={(e) => handleResize(e, extraElementRef)}
              onMouseDown={(e) => handleResize(e, extraElementRef)}
              className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
            <div
              onTouchStart={(e) => handleResize(e, extraElementRef)}
              onMouseDown={(e) => handleResize(e, extraElementRef)}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
          </>
          : <>
            <div
              // onMouseDown={(e) => { e.stopPropagation(); component.resizeElement(elementWrapperDivRef, component)}}
              onTouchStart={(e) => handleResize(e, elementWrapperDivRef)}
              onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -right-[3px] w-[40px] h-[40px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
            <div
              onTouchStart={(e) => handleResize(e, elementWrapperDivRef)}
              onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              className={`no-drag ${willShow()} absolute -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
            <div
              onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              onTouchStart={(e) => handleResize(e, elementWrapperDivRef)}
              className={`no-drag ${willShow()} absolute -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]`}></div>
          </>
      }

      <div className={`absolute -top-[3px] -left-[3px] no-drag ${willShow()} z-[9999]`}>
        <div
          onTouchStart={(e) => handleRotate(e, elementWrapperDivRef)}
          onMouseDown={(e) => handleRotate(e, elementWrapperDivRef)}
          className="w-[15px] h-[15px] bg-green-500 z-[9999] flex justify-center items-center">
          <BsArrowsMove className="text-white"/> {/* Rotate icon */}
        </div>
      </div>
    </>
  )
}

export default Element;