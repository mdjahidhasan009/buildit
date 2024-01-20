import createComponentFactory from "../../utils/createComponentFactory.ts";
import {useContext} from "react";
import {DesignContext} from "../../context/DesignProvider.tsx";

export const useComponentCreation = () => {
  const {setCurrentComponent, setComponents, components, setWidth, setFontSize, moveElement, resizeElement, rotateElement} = useContext(DesignContext);

  const componentFactory = createComponentFactory(
    setCurrentComponent, moveElement, resizeElement, rotateElement
  );
  const createShape = (name: string, type: string) => {
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

  return  {
    createShape,
    addImage,
    addText
  }
}