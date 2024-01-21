import {createContext, useEffect, useState} from "react";
// import useCombinedDesignState from "../hooks/useCombinedDesignState.ts";
import {initialStateOfDesignContext} from "./DesignProviderConstant.ts";
import createComponentFactory from "../utils/createComponentFactory.ts";
export const DesignContext = createContext(initialStateOfDesignContext);
export const DesignProvider = ({ children }) => {
  const [state, setState] = useState('');
  const [currentComponent, setCurrentComponent] = useState(null);
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const [rotate, setRotate] = useState(0);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [left, setLeft] = useState('');
  const [top, setTop] = useState('');
  const [padding, setPadding] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [opacity, setOpacity] = useState('');
  const [text, setText] = useState('');
  const [zIndex, setZIndex] = useState('');
  const [radius, setRadius] = useState(0);
  const [components, setComponents] = useState([{
    name: 'main_frame',
    type: 'rect',
    id: Math.floor((Math.random() * 100) + 1),
    height: 450,
    width: 650,
    zIndex: 1,
    color: '#fff',
    image: "",
  }]);
  const [show, setShow] = useState({ status: true, name: '' });
  const setElements = (type: string, name: string) => {
    setState(type);
    setShow({
      status: false,
      name: name
    });
  }

  const opacityHandler = (e) => {
    console.log('e.target.value:', parseFloat(e.target.value))
    setOpacity(parseFloat(e.target.value));
  };
  const updateCurrentComponentProperties = () => {
    console.log("currentComponent in useComponentUpdate:", currentComponent);
    // console.log('updateCurrentComponentProperties111111111111111111');
    if(currentComponent) {
      // console.log('updateCurrentComponentProperties222222222222222222222');
      const index = components.findIndex(component => component.id === currentComponent.id);
      const temp = components.filter(component => component.id !== currentComponent.id);

      if(currentComponent !== 'text') {
        components[index].width = width || currentComponent?.width;
        components[index].height = height || currentComponent?.height;
        components[index].rotate = rotate || currentComponent?.rotate;
      }
      if(currentComponent?.name === 'text') {
        components[index].padding = padding || currentComponent?.padding;
        components[index].fontSize = fontSize || currentComponent?.fontSize;
        components[index].fontWeight = fontWeight || currentComponent?.fontWeight;
        components[index].title = text || currentComponent?.title;
      }
      if(currentComponent?.name === 'image') {
        components[index].radius = radius || currentComponent?.radius;
      }
      if(currentComponent?.name === 'main_frame' && image) {
        components[index].image = image || currentComponent?.image;
      }
      components[index].color = color || currentComponent?.color;
      if(currentComponent?.name !== 'main_frame') {
        components[index].left = left || currentComponent?.left;
        components[index].top = top || currentComponent?.top;
        components[index].opacity = opacity || currentComponent?.opacity;
        components[index].zIndex = zIndex || currentComponent?.zIndex;
      }
      setComponents([...temp, components[index]]);
      setWidth('');
      setHeight('');
      setLeft('');
      setTop('');
      setRotate(0);
      setColor('');
      setOpacity('');
      setZIndex('');
      setPadding('');
      setFontSize('');
      setFontWeight('');
      setText('');
      setRadius(0);
    }
  }

  const createShape = (name: string, type: string) => {
    console.log('createShape')
    const newComponent = componentFactory({
      name,
      type,
      additionalProps: {
        width: 200,
        height: 150,
      }
    });
    setComponents([...components, newComponent]);
  }

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

  const componentFactory = createComponentFactory(
    setCurrentComponent, moveElement, resizeElement, rotateElement
  );

  const addImage = (image) => {
    const newComponent = componentFactory(
      {
        name: 'image',
        type: 'image',
        additionalProps: {
          width: 200,
          height: 150,
          radius: 0,
          image
        }
      }
    );
    setCurrentComponent(newComponent);
    setComponents([...components, newComponent]);
  }

  const addText = (name, type) => {
    const newComponent = componentFactory(
      {
        name,
        type,
        additionalProps: {
          width: 200,
          height: 150,
          text: 'Add text',
          fontSize: 22,
          padding: 6,
          fontWeight: 400,
        }
      }
    );
    setWidth('');
    setFontSize('');
    setCurrentComponent(newComponent);
    setComponents([...components, newComponent]);
  }

  const removeBackground = () => {
    const component = components.find(component => component.id === currentComponent.id);
    const temp = components.filter(component => component.id !== currentComponent.id);
    component.image = '';
    setImage('');
    setComponents([...temp, component]);
  }

  const removeComponent = (id: string) => {
    const temp = components.filter(component => component.id !== id);
    setComponents(temp);
    setCurrentComponent('')
  }

  // Context value
  const contextValue = {
    state, setState,
    currentComponent, setCurrentComponent,
    color, setColor,
    image, setImage,
    rotate, setRotate,
    width, setWidth,
    height, setHeight,
    left, setLeft,
    top, setTop,
    padding, setPadding,
    fontSize, setFontSize,
    fontWeight, setFontWeight,
    opacity, setOpacity,
    text, setText,
    zIndex, setZIndex,
    radius, setRadius,
    components, setComponents,
    show, setShow,
    setElements,
    updateCurrentComponentProperties,
    opacityHandler,
    createShape, addImage, addText, removeBackground, removeComponent, moveElement, resizeElement, rotateElement
  };

  return (
    <DesignContext.Provider value={contextValue}>
      {children}
    </DesignContext.Provider>
  );
};
