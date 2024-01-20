import { useStateHandlers } from "./design/useStateHandlers";
import { useComponentManipulation } from "./design/useComponentManipulation";
import { useComponentCreation } from "./design/useComponentCreation";
import { useComponentUpdate } from "./design/useComponentUpdate";
import { useComponentLifecycle } from "./design/useComponentLifecycle";

// New hook that combines all modular hooks
const useCombinedDesignState = () => {
  const stateHandlers = useStateHandlers();
  const componentManipulation = useComponentManipulation();
  const componentCreation = useComponentCreation();
  const componentUpdate = useComponentUpdate();
  const componentLifecycle = useComponentLifecycle();

  // Combine all states and methods into a single object
  return {
    ...stateHandlers,
    ...componentManipulation,
    ...componentCreation,
    ...componentUpdate,
    ...componentLifecycle,
  };
};

export default useCombinedDesignState;