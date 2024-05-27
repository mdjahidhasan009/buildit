import { useDispatch } from "@/lib/reduxStore";
import { removeComponent, setCurrentComponent } from "@/lib/features/components/componentsSlice";
import {IComponent} from "@/lib/features/components/IComponent";

const useComponentActions = (component: IComponent) => {
  const dispatch = useDispatch();
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const handleSetCurrentComponent = () => {
    if (!isTouchDevice) {
      dispatch(setCurrentComponent(component));
    }
  };

  const handleRemoveComponent = () => {
    dispatch(removeComponent(component.id));
  };

  return { handleSetCurrentComponent, handleRemoveComponent };
};

export default useComponentActions;
