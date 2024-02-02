import {useContext} from "react";
import {DesignContext} from "../context/DesignProvider.tsx";

export const useComponentUpdate = (currentComponent, setComponents, components, setImage) => {
  // const { currentComponent, setComponents, components, setWidth, setFontSize, setHeight, setLeft, setTop, setRotate,
  //   setColor, setOpacity, setZIndex, setPadding, setFontWeight, setText, setRadius, setImage, image, width, height,
  //   left, top, rotate, color, opacity, zIndex, padding, fontSize, fontWeight, text, radius } = useContext(DesignContext);

  // const updateCurrentComponentProperties = () => {
  //   console.log("currentComponent in useComponentUpdate:", currentComponent);
  //   // console.log('updateCurrentComponentProperties111111111111111111');
  //   if(currentComponent) {
  //     // console.log('updateCurrentComponentProperties222222222222222222222');
  //     const index = components.findIndex(component => component.id === currentComponent.id);
  //     const temp = components.filter(component => component.id !== currentComponent.id);
  //
  //     if(currentComponent !== 'text') {
  //       components[index].width = width || currentComponent?.width;
  //       components[index].height = height || currentComponent?.height;
  //       components[index].rotate = rotate || currentComponent?.rotate;
  //     }
  //     if(currentComponent?.name === 'text') {
  //       components[index].padding = padding || currentComponent?.padding;
  //       components[index].fontSize = fontSize || currentComponent?.fontSize;
  //       components[index].fontWeight = fontWeight || currentComponent?.fontWeight;
  //       components[index].title = text || currentComponent?.title;
  //     }
  //     if(currentComponent?.name === 'image') {
  //       components[index].radius = radius || currentComponent?.radius;
  //     }
  //     if(currentComponent?.name === 'main_frame' && image) {
  //       components[index].image = image || currentComponent?.image;
  //     }
  //     components[index].color = color || currentComponent?.color;
  //     if(currentComponent?.name !== 'main_frame') {
  //       components[index].left = left || currentComponent?.left;
  //       components[index].top = top || currentComponent?.top;
  //       components[index].opacity = opacity || currentComponent?.opacity;
  //       components[index].zIndex = zIndex || currentComponent?.zIndex;
  //     }
  //     setComponents([...temp, components[index]]);
  //     setWidth('');
  //     setHeight('');
  //     setLeft('');
  //     setTop('');
  //     setRotate(0);
  //     setColor('');
  //     setOpacity('');
  //     setZIndex('');
  //     setPadding('');
  //     setFontSize('');
  //     setFontWeight('');
  //     setText('');
  //     setRadius(0);
  //   }
  // }

  const removeBackground = () => {
    const component = components.find(component => component.id === currentComponent.id);
    const temp = components.filter(component => component.id !== currentComponent.id);
    component.image = '';
    setImage('');
    setComponents([...temp, component]);
  }

  return {
    // updateCurrentComponentProperties,
    removeBackground
  }
}