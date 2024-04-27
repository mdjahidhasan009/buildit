import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IComponent } from "@/lib/features/components/IComponent";
import {AppDispatch} from "@/lib/reduxStore";

const useRotate = (elementRef: React.RefObject<HTMLElement>, rotateIconRef: React.RefObject<HTMLElement>, component: IComponent) => {
  const initialAngleRef = useRef<number>(0);
  const initialRotationRef = useRef<number>(0);
  const finalRotationRef = useRef<number>(0);

  const getRotationDegrees = (transform: string) => {
    const values = transform.match(/matrix\((.+)\)/);
    if (values && values[1]) {
      const parts = values[1].split(', ');
      const a = parseFloat(parts[0]);
      const b = parseFloat(parts[1]);
      const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      return angle;
    }
    return 0;
  };

  const calculateAngle = (clientX: number, clientY: number) => {
    if(!elementRef.current) {
      console.error('No elementRef');
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const centerX: number = rect.left + rect.width / 2;
    const centerY: number = rect.top + rect.height / 2;
    const radians: number = Math.atan2(clientY - centerY, clientX - centerX);
    return radians * (180 / Math.PI);
  };

  const handleMouseDown = (event: MouseEvent | TouchEvent) => {
    let clientX = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    let clientY = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;
    // initialAngleRef.current = calculateAngle(event.clientX, event.clientY);
    let initialAngle = calculateAngle(clientX, clientY);
    if(!initialAngle) {
      console.error('Can not get initialAngleRef');
      return;
    }

    if(!elementRef.current) {
      console.error('No elementRef');
      return;
    }

    initialAngleRef.current = initialAngle;

    const currentTransform = window.getComputedStyle(elementRef.current).transform;
    initialRotationRef.current = getRotationDegrees(currentTransform);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (!elementRef.current) return;

    let clientX = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    let clientY = event.type.includes('touch') ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;

    const newAngle = calculateAngle(clientX, clientY);
    if(!newAngle) {
      console.error('Can not get newAngle');
      return;
    }

    const angleDiff = newAngle - initialAngleRef.current;
    const newRotation = (initialRotationRef.current + angleDiff + 360) % 360;
    elementRef.current.style.transform = `rotate(${newRotation}deg)`;
    finalRotationRef.current = newRotation;
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchmove', handleMouseMove);
    window.removeEventListener('touchend', handleMouseUp);
  };

  useEffect(() => {
    const rotateHandle = rotateIconRef.current;
    if (rotateHandle) {
      rotateHandle.addEventListener('mousedown', handleMouseDown);
      rotateHandle.addEventListener('touchstart', handleMouseDown);
      return () => {
        rotateHandle.removeEventListener('mousedown', handleMouseDown);
        rotateHandle.removeEventListener('touchstart', handleMouseDown);
      };
    }
  }, [rotateIconRef.current]);

  return { rotation : finalRotationRef.current };
};

export default useRotate;

