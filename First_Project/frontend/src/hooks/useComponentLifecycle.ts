import {useContext} from "react";
import {DesignContext} from "../context/DesignProvider.tsx";

export const useComponentLifecycle = (setCurrentComponent, components, setComponents) => {
  // const { setCurrentComponent, components, setComponents} = useContext(DesignContext); // This approach not working
  const removeComponent = (id: string) => {
    const temp = components.filter(component => component.id !== id);
    setComponents(temp);
    setCurrentComponent('')
  }

  return {
    removeComponent
  }
}