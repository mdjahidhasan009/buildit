import createComponentFactory from "../utils/createComponentFactory.ts";
import {useDispatch} from "react-redux";
import {
  updateComponentPosition,
  updateComponentRotation,
  updateComponentSize
} from "@/lib/features/components/componentsSlice";
import {AppDispatch} from "@/lib/reduxStore";

export const useComponentCreation = (setCurrentComponent, setComponents, components, setWidth, setFontSize) => {
  const dispatch: AppDispatch  = useDispatch();

  const moveElement = (componentId, componentRef) => {
    // Logic to move element...
    // Once movement is complete:
    dispatch(updateComponentPosition({ id: componentId, left: newLeft, top: newTop }));
  };

  const resizeElement = (componentId, componentRef) => {
    // Logic to resize element...
    // Once resizing is complete:
    dispatch(updateComponentSize({ id: componentId, width: newWidth, height: newHeight }));
  };

  const rotateElement = (componentId, componentRef) => {
    // Logic to rotate element...
    // Once rotation is complete:
    dispatch(updateComponentRotation({ id: componentId, rotate: newRotate }));
  };

  // const componentFactory = createComponentFactory(
  //   setCurrentComponent, moveElement, resizeElement, rotateElement
  // );

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