import React, { useEffect, useRef } from "react";
import { IComponent } from "@/lib/features/components/IComponent";
import {setCurrentComponent} from "@/lib/features/components/componentsSlice";
import {AppDispatch} from "@/lib/reduxStore";
import {useDispatch} from "react-redux";

type currentCoordinate = {
  currentXAxis: number,
  currentYAxis: number,
}

function useDragger(componentRef: React.RefObject<HTMLElement>, component: IComponent): currentCoordinate {
  // if(!componentRef.current) return;

  const isClicked = useRef<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })

  useEffect(() => {
    const target = componentRef.current;
    if (!target) {
      console.error("Please provide component ref");
      return;
    }

    const container = target.parentElement;
    if (!container) {
      console.error("target element must have a parent");
      return;
    }

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      // First, assert that e.target is an Element to safely use the closest method.
      if (!(e.target instanceof Element)) {
        return;
      }

      // Check if the target element or any of its parents has a class that should prevent dragging
      if (e?.target?.closest('.no-drag')) {
        return; // This prevents dragging when resizing or rotating
      }

      e.stopPropagation();
      e.preventDefault();

      isClicked.current = true;
      coords.current.startX = e.type === 'touchstart' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      coords.current.startY = e.type === 'touchstart' ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      if(isTouchDevice) {
        dispatch(setCurrentComponent(component));
      }
    }

    const onMouseUp = (e: MouseEvent | TouchEvent) => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    }

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isClicked.current) return;

      const nextX = ((e.type.includes('touch')) ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX) - coords.current.startX + coords.current.lastX;
      const nextY = ((e.type.includes('touch')) ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY) - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    }

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('touchstart', onMouseDown);

    target.addEventListener('mouseup', onMouseUp);
    target.addEventListener('touchend', onMouseUp);

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onMouseMove);

    container.addEventListener('mouseleave', onMouseUp);
    container.addEventListener('touchend', onMouseUp);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  }, [componentRef.current])

  return { currentXAxis: coords.current.lastX, currentYAxis: coords.current.lastY }

}

export default useDragger;
