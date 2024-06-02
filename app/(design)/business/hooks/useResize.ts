import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "@/lib/reduxStore";
import { updateComponentSize } from "@/lib/features/components/componentsSlice";
import {IDesignComponent} from "@/app/(design)/constants/Design";

const useResize = (elementRef: React.RefObject<HTMLElement>, resizeIconRef: React.RefObject<HTMLElement>, component: IDesignComponent) => {
  const dispatch = useDispatch();
  const isClickRef = useRef(false);
  const isResizing = useRef(false);
  const lastDimensions = useRef({ width: 0, height: 0 });
  const start = useRef<{x: number, y: number}>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isResizing.current || !elementRef.current) return;

    let clientX = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    let clientY = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;
    const deltaX: number = clientX - start.current.x;
    const deltaY: number = clientY - start.current.y;

    let newWidth, newHeight;
    if (component?.type === 'circle') {
      newWidth = lastDimensions.current.width + deltaX
    } else {
      newWidth = lastDimensions.current.width + deltaX;
      newHeight = lastDimensions.current.height + deltaY;
    }

    elementRef.current.style.width = `${newWidth}px`;
    elementRef.current.style.height = `${newHeight}px`;
  }, [component?.type, elementRef]);

  const handleMouseUp = useCallback(() => {
    if (!isResizing.current) return;
    isResizing.current = false;
    if (elementRef.current) {
      dispatch(updateComponentSize({
        id: component.id,
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight
      }));
    }

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("touchmove", handleMouseMove);

    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mouseleave", handleMouseUp);
    document.removeEventListener("touchend", handleMouseUp);
  }, [dispatch, elementRef, component.id]);

  const handleMouseDown = useCallback((event: MouseEvent | TouchEvent) => {
    if (!elementRef.current) return;

    isClickRef.current = true;
    isResizing.current = true;
    lastDimensions.current.width = elementRef.current.offsetWidth;
    lastDimensions.current.height = elementRef.current.offsetHeight;
    let clientX = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    let clientY = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;
    start.current.x = clientX;
    start.current.y = clientY;

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

