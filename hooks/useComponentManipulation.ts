export const useComponentManipulation = (setLeft, setTop, setWidth, setHeight, setRotate, setCurrentComponent) => {
  const moveElement = (componentRef, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;
    const currentDiv = componentRef.current;
    if(!currentDiv) return;

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

  const resizeElement = (currentDivRef, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;
    const currentDiv = currentDivRef.current;
    if(!currentDiv) return;

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

  const rotateElement = (currentElementRef, currentInfo) => {
    setCurrentComponent(currentInfo);

    const target = currentElementRef?.current;
    if(!target) return;

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