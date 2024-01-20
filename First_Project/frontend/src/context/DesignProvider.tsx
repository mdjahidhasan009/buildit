import {createContext} from "react";
import useCombinedDesignState from "../hooks/useCombinedDesignState.ts";
import {initialStateOfDesignContext} from "./DesignProviderConstant.ts";
export const DesignContext = createContext(initialStateOfDesignContext);
export const DesignProvider = ({ children }) => {
  const designState = useCombinedDesignState();

  return (
    <DesignContext.Provider value={designState}>
      {children}
    </DesignContext.Provider>
  );
};
