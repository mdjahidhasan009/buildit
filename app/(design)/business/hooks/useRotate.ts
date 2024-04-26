import {useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/reduxStore";
import {IComponent} from "@/lib/features/components/IComponent";
import {updateComponentRotation} from "@/lib/features/components/componentsSlice";

// Hook for handling rotation
function useRotate(elementRef : any, component: IComponent) {


  const dispatch = useDispatch<AppDispatch>();
  const centerRef = useRef<{
    centerX: number,
    centerY: number
  }>({
    centerX: 0,
    centerY: 0,
  });
  const initialAngleRef = useRef(0);


  useEffect(() => {
    if(!elementRef.current) return;

    const target = elementRef?.current;
    if (!target) {
      console.error("Please provide component ref");
      return;
    }

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      if(!elementRef?.current) {
        return;
      }
      // First, assert that e.target is an Element to safely use the closest method.
      if (!(e.target instanceof Element)) {
        return;
      }

      // Assuming the element's center as the pivot for rotation
      const rect = elementRef.current.getBoundingClientRect();
      centerRef.current.centerX = rect.left + rect.width / 2;
      centerRef.current.centerY = rect.top + rect.height / 2;

      if (e instanceof TouchEvent) {
        initialAngleRef.current = calculateAngle(e.touches[0].clientX, e.touches[0].clientY);
      } else {
        initialAngleRef.current = calculateAngle(e.clientX, e.clientY);
      }

      elementRef?.current.addEventListener('mousemove', moveMouse);
      elementRef?.current.addEventListener('touchmove', moveMouse);
      elementRef?.current.addEventListener('mouseup', stopRotate);
      elementRef?.current.addEventListener('touchend', stopRotate);
    }

    // Function to calculate the angle based on current mouse or touch position
    const calculateAngle = (pageX: number, pageY: number) => {
      const dx = pageX - centerRef.current?.centerX;
      const dy = pageY - centerRef.current?.centerY;
      return Math.atan2(dy, dx) * (180 / Math.PI);
    };

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

      let angleDiff = currentAngle - initialAngleRef.current;
      let newRotate = (angleDiff + 360) % 360; // Normalize the angle
      elementRef.current.style.transform = `rotate(${newRotate}deg)`;

      dispatch(updateComponentRotation({ id: component.id, rotate: newRotate }));
    };

    // const stopRotate = () => {
    //   document.removeEventListener('mousemove', moveMouse);
    //   document.removeEventListener('mouseup', stopRotate);
    //   document.removeEventListener('touchmove', moveMouse);
    //   document.removeEventListener('touchend', stopRotate);
    // };
    const stopRotate = () => {
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('touchmove', moveMouse);
      document.removeEventListener('mouseup', stopRotate);
      document.removeEventListener('touchend', stopRotate);
    };

    // document.addEventListener('mousedown', onMouseDown);
    // document.addEventListener('touchstart', onMouseDown);
    // document.addEventListener('mousemove', moveMouse);
    // document.addEventListener('mouseup', stopRotate);
    // document.addEventListener('touchmove', moveMouse);
    // document.addEventListener('touchend', stopRotate);

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('touchstart', onMouseDown);

    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('touchstart', onMouseDown);
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('touchmove', moveMouse);
      document.removeEventListener('mouseup', stopRotate);
      document.removeEventListener('touchend', stopRotate);
    };
  }, [elementRef, dispatch, component]);

  return { rotate: component.rotate };
}

export default useRotate;