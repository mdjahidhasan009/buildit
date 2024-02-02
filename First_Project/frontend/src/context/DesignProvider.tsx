import {createContext, useState} from "react";
import {initialStateOfDesignContext} from "./DesignProviderConstant.ts";
import {useComponentCreation} from "../hooks/useComponentCreation.ts";
import {useComponentLifecycle} from "../hooks/useComponentLifecycle.ts";
import {useComponentManipulation} from "../hooks/useComponentManipulation.ts";
import {useComponentUpdate} from "../hooks/useComponentUpdate.ts";

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

  const { removeComponent } = useComponentLifecycle(setCurrentComponent, components, setComponents);
  const { moveElement, resizeElement, rotateElement } = useComponentManipulation(setLeft, setTop, setWidth, setHeight, setRotate, setCurrentComponent);
  const { createShape, addImage, addText } = useComponentCreation(setCurrentComponent, setComponents, components, setWidth, setFontSize, moveElement, resizeElement, rotateElement);
  const { removeBackground } = useComponentUpdate(currentComponent, setComponents, components, setImage);

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
    opacityHandler,
    createShape, addImage, addText, removeBackground, removeComponent, moveElement, resizeElement, rotateElement
  };

  return (
    <DesignContext.Provider value={contextValue}>
      {children}
    </DesignContext.Provider>
  );
};
