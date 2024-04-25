import {BsArrowsMove} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {updateComponentRotation, updateComponentSize} from "@/lib/features/components/componentsSlice";
import {AppDispatch, RootState} from "@/lib/reduxStore";
import {IComponent} from "@/lib/features/components/IComponent";

interface ElementProps {
  elementWrapperDivRef: React.RefObject<HTMLElement>;
  component: IComponent;
  extraElementRef?: React.RefObject<HTMLElement>;
}

const Element: React.FC<ElementProps> = ({ elementWrapperDivRef, component, extraElementRef = null }) => {
  const dispatch: AppDispatch  = useDispatch();

  const handleResize = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, elementRef: React.RefObject<HTMLElement>) => {
    event.stopPropagation();
    if (!elementRef.current) return;

    let isResizing = true;
    const initialMouseX = event.clientX;
    const initialMouseY = event.clientY;
    const initialDimensions = elementRef.current.getBoundingClientRect();

    const moveMouse = (e: MouseEvent) => {
      if (!isResizing || !elementRef.current) return;

      // Calculate the difference between the current mouse position and the initial mouse position
      const dx = e.clientX - initialMouseX;
      const dy = e.clientY - initialMouseY;

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
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', mouseUp);

    event.stopPropagation();
  };


  const handleRotate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, elementRef: React.RefObject<HTMLElement>) => {
    event.stopPropagation();
    if (!elementRef.current) return;

    // const startPos = { x: event.clientX, y: event.clientY };
    const startPos = { x: event.movementX, y: event.movementY };
    // Assuming the element's center as the pivot for rotation
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let initialAngle = Math.atan2(startPos.y - centerY, startPos.x - centerX) * (180 / Math.PI);

    const moveMouse = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const currentMouseAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      let angleDiff = currentMouseAngle - initialAngle;

      // Normalize the angle
      let newRotate = (angleDiff + 360) % 360;

      // Directly manipulating styles for visual feedback during rotation
      elementRef.current.style.transform = `rotate(${newRotate}deg)`;
      // Dispatch action to update component's rotation in the Redux store

      document.addEventListener('mouseup', mouseUp);

      dispatch(updateComponentRotation({ id: component?.id, rotate: newRotate }));
    };

    const mouseUp = () => {
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mousemove', moveMouse);
    event.stopPropagation();
  };

  return (
    <>
      {
        extraElementRef?.current
          ? <>
            <div
              onMouseDown={(e) => handleResize(e, extraElementRef)}
              className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => handleResize(e, extraElementRef)}
              className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => handleResize(e, extraElementRef)}
              className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
          </>
          : <>
            <div
              // onMouseDown={(e) => { e.stopPropagation(); component.resizeElement(elementWrapperDivRef, component)}}
              onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
            <div
              onMouseDown={(e) => handleResize(e, elementWrapperDivRef)}
              className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[9999]'></div>
          </>
      }

      <div className="absolute -top-[3px] -left-[3px] hidden group-hover:block">
        <div
          onMouseDown={(e) => handleRotate(e, elementWrapperDivRef)}
            className="w-[15px] h-[15px] bg-green-500 z-[9999] flex justify-center items-center">
          <BsArrowsMove className="text-white" /> {/* Rotate icon */}
        </div>
      </div>
    </>
  )
}

export default Element;