import { useDispatch } from "@/lib/reduxStore";
import { removeComponent, setCurrentComponent } from "@/lib/features/components/componentsSlice";
import {IDesignComponent} from "@/app/(design)/constants/Design";

const useComponentActions = (component: IDesignComponent) => {
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
