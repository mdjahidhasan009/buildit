// import React, {useCallback, useEffect, useRef} from "react";
// import { useDispatch } from "react-redux";
// import { updateComponentSize } from "@/lib/features/components/componentsSlice";
// import {IComponent} from "@/lib/features/components/IComponent";
//
// const useResize = (elementRef: React.RefObject<HTMLElement>, resizeIconRef: React.RefObject<HTMLElement>, component: IComponent) => {
//   console.log('useResize444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444')
//   const dispatch = useDispatch();
//   const isClickRef = useRef<boolean>(false);
//   const isResizing = useRef<boolean>(false);
//   const lastDimensions = useRef<{
//     width: number,
//     height: number,
//   }>({ width: 0, height: 0 });
//   const start = useRef<{
//     x: number,
//     y: number
//   }>({
//     x: 0,
//     y: 0
//   });
//
//
//
//   // const handleMouseMove = (e: MouseEvent | TouchEvent) => {
//   //   if (!isResizing.current || !elementRef.current || !isClickRef.current) return;
//   //   console.log('handleMouseMove')
//   //
//   //   const currentX = e.type.includes('touch') ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
//   //   const currentY = e.type.includes('touch') ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
//   //
//   //   const deltaX = currentX - start.current?.x;
//   //   const deltaY = currentY - start.current?.y;
//   //
//   //   const newWidth = lastDimensions.current.width + deltaX;
//   //   const newHeight = lastDimensions.current.height + deltaY;
//   //
//   //   elementRef.current.style.width = `${newWidth}px`;
//   //   elementRef.current.style.height = `${newHeight}px`;
//   // };
//
//   const handleMouseMove = useCallback((e) => {
//     if (!isResizing.current || !elementRef.current) return;
//
//     console.log('handleMouseMove');
//
//     const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
//     const currentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
//     const deltaX = currentX - start.current.x;
//     const deltaY = currentY - start.current.y;
//
//     const newWidth = lastDimensions.current.width + deltaX;
//     const newHeight = lastDimensions.current.height + deltaY;
//
//     elementRef.current.style.width = `${newWidth}px`;
//     elementRef.current.style.height = `${newHeight}px`;
//   }, []);
//
//
//
//   // const handleMouseUp = () => {
//   //   console.log('handleMouseUp++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
//   //   // if(!elementRef.current) {
//   //   //   console.error('currentComponentRef undefined');
//   //   //   return;
//   //   // }
//   //   isClickRef.current = false;
//   //   console.log('handleMouseUp')
//   //
//   //   isResizing.current = false;
//   //   // Update the Redux store with the new dimensions
//   //   if(elementRef.current) {
//   //     dispatch(updateComponentSize({
//   //       id: component.id,
//   //       width: elementRef.current.offsetWidth,
//   //       height: elementRef.current.offsetHeight
//   //     }));
//   //   }
//   //
//   //   resizeIconRef.current.removeEventListener("mousemove", handleMouseMove);
//   //   resizeIconRef.current.removeEventListener("touchmove", handleMouseMove);
//   //
//   //   resizeIconRef.current.removeEventListener("mouseup", handleMouseUp);
//   //   resizeIconRef.current.removeEventListener("touchend", handleMouseUp);
//   // };
//
//   const handleMouseUp = useCallback(() => {
//     if (!isResizing.current) return;
//     console.log('handleMouseUp - resizing ends');
//
//     if (elementRef.current) {
//       dispatch(updateComponentSize({
//         id: component.id,
//         width: elementRef.current.offsetWidth,
//         height: elementRef.current.offsetHeight
//       }));
//     }
//
//     isClickRef.current = false;
//     isResizing.current = false;
//
//     document.removeEventListener("mousemove", handleMouseMove);
//     document.removeEventListener("touchmove", handleMouseMove);
//     document.removeEventListener("mouseup", handleMouseUp);
//     document.removeEventListener("touchend", handleMouseUp);
//   }, [dispatch, elementRef, handleMouseMove]);
//
//
//
//   const handleMouseDown = useCallback((event) => {
//     if (!elementRef.current) {
//       console.error('currentComponentRef undefined');
//       return;
//     }
//
//     console.log('handleMouseDown started');
//
//     isClickRef.current = true;
//     isResizing.current = true;
//     lastDimensions.current.width = elementRef.current.offsetWidth;
//     lastDimensions.current.height = elementRef.current.offsetHeight;
//
//     start.current.x = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
//     start.current.y = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
//
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("touchmove", handleMouseMove);
//   }, [handleMouseMove]);
//
//
//
//   // useEffect(() => {
//   //   if(!elementRef?.current || !resizeIconRef.current) {
//   //     console.error('Need elementRef and resizeIconRef');
//   //     return;
//   //   }
//   //   console.log('done+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
//   //
//   //   resizeIconRef.current.addEventListener("mousedown", handleMouseDown);
//   //   resizeIconRef.current.addEventListener("touchstart", handleMouseDown);
//   //
//   //   return () => {
//   //     if(!resizeIconRef.current) {
//   //       console.error('currentComponentRef undefined');
//   //       return;
//   //     }
//   //
//   //     console.log('returning++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
//   //
//   //     resizeIconRef.current.removeEventListener("mousedown", handleMouseDown);
//   //     resizeIconRef.current.removeEventListener("touchstart", handleMouseDown);
//   //   };
//   // }, [dispatch, elementRef, component.id, handleMouseDown]);
//
//   useEffect(() => {
//     const currentResizeIconRef = resizeIconRef.current;
//     if (currentResizeIconRef) {
//       currentResizeIconRef.addEventListener("mousedown", handleMouseDown);
//       currentResizeIconRef.addEventListener("touchstart", handleMouseDown);
//
//       // Add mouseup and touchend to document in the same useEffect to ensure it's only added after mousedown
//       document.addEventListener("mouseup", handleMouseUp);
//       document.addEventListener("touchend", handleMouseUp);
//     }
//
//     return () => {
//       if (currentResizeIconRef) {
//         currentResizeIconRef.removeEventListener("mousedown", handleMouseDown);
//         currentResizeIconRef.removeEventListener("touchstart", handleMouseDown);
//       }
//       // Clean up to ensure no lingering events
//       document.removeEventListener("mouseup", handleMouseUp);
//       document.removeEventListener("touchend", handleMouseUp);
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("touchmove", handleMouseMove);
//     };
//   }, [handleMouseDown, handleMouseMove, handleMouseUp, resizeIconRef]);
//
//
//
//
//   return;
// };
//
// export default useResize;



import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateComponentSize } from "@/lib/features/components/componentsSlice";
import { IComponent } from "@/lib/features/components/IComponent";

const useResize = (elementRef, resizeIconRef, component) => {
  const dispatch = useDispatch();
  const isClickRef = useRef(false);
  const isResizing = useRef(false);
  const lastDimensions = useRef({ width: 0, height: 0 });
  const start = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    console.log('useResize-handleMouseMove')
    if (!isResizing.current || !elementRef.current) return;
    const { clientX, clientY } = event.type.includes('touch') ? event.touches[0] : event;
    const deltaX = clientX - start.current.x;
    const deltaY = clientY - start.current.y;
    const newWidth = lastDimensions.current.width + deltaX;
    const newHeight = lastDimensions.current.height + deltaY;
    elementRef.current.style.width = `${newWidth}px`;
    elementRef.current.style.height = `${newHeight}px`;
    console.log(`MouseMove - New size: ${newWidth}x${newHeight}`);
  }, []);

  const handleMouseUp = useCallback(() => {
    console.log('useResize-handleMouseUp')
    if (!isResizing.current) return;
    console.log('MouseUp - Resizing ends');
    isResizing.current = false;
    if (elementRef.current) {
      dispatch(updateComponentSize({
        id: component.id,
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight
      }));
      console.log(`MouseUp - Component size updated: ${elementRef.current.offsetWidth}x${elementRef.current.offsetHeight}`);
    }

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("touchmove", handleMouseMove);

    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mouseleave", handleMouseUp);
    document.removeEventListener("touchend", handleMouseUp);
  }, [dispatch, elementRef, component.id]);

  const handleMouseDown = useCallback((event) => {
    console.log('useResize-handleMouseDown')
    if (!elementRef.current) return;
    console.log('MouseDown - Resizing starts');
    isClickRef.current = true;
    isResizing.current = true;
    lastDimensions.current.width = elementRef.current.offsetWidth;
    lastDimensions.current.height = elementRef.current.offsetHeight;
    const { clientX, clientY } = event.type.includes('touch') ? event.touches[0] : event;
    start.current.x = clientX;
    start.current.y = clientY;
    console.log(`MouseDown - Start at: ${clientX}, ${clientY}`);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
  }, [elementRef]);

  useEffect(() => {
    const resizeIcon = resizeIconRef.current;
    if (resizeIcon) {
      resizeIcon.addEventListener("mousedown", handleMouseDown);
      resizeIcon.addEventListener("touchstart", handleMouseDown);
    }
    // Handling global events here to ensure they are always in effect


    return () => {
      if (resizeIcon) {
        resizeIcon.removeEventListener("mousedown", handleMouseDown);
        resizeIcon.removeEventListener("touchstart", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, resizeIconRef]);

  return null;
};

export default useResize;

