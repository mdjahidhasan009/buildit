import {useContext} from "react";
import {DesignContext} from "../context/DesignProvider.tsx";

export const useComponentManipulation = (setLeft, setTop, setWidth, setHeight, setRotate, setCurrentComponent) => {
  // const { setLeft, setTop, setWidth, setHeight, setRotate, setCurrentComponent } = useContext(DesignContext); // This approach not working
  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;
    const currentDiv = document.getElementById(id);

    const moveMouse = (e) => {
      const { movementX, movementY } = e;
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if(isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    }

    const mouseUp = (e) => {
      isMoving = false;
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    }

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', mouseUp);
  }

  const resizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;
    const currentDiv = document.getElementById(id);

    const moveMouse = (e) => {
      const { movementX, movementY } = e;
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if(isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    }

    const mouseUp = (e) => {
      isMoving = false;
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    }

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', mouseUp);
  }

  const rotateElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);
    const mouseMove = (e) => {
      const { movementX, movementY } = e;
      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;
      const values = trans.split('(')[1].split(')')[0].split(',');
      const angle = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
      let deg = angle < 0 ? angle + 360 : angle;
      if(movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    }

    const mouseUp = (e) => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);

      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;
      const values = trans.split('(')[1].split(')')[0].split(',');
      const angle = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  }

  return {
    moveElement, resizeElement, rotateElement
  }
}