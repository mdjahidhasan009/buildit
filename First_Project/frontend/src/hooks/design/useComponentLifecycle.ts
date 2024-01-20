import {useContext} from "react";
import {DesignContext} from "../../context/DesignProvider.tsx";

export const useComponentLifecycle = () => {
  const { setCurrentComponent, components, setComponents} = useContext(DesignContext);
  const removeComponent = (id: string) => {
    const temp = components.filter(component => component.id !== id);
    setComponents(temp);
    setCurrentComponent('')
  }

  return {
    removeComponent
  }
}