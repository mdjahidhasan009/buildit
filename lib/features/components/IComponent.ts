import {IDesignComponent} from "@/app/(design)/constants/Design";

interface ComponentState {
  components: IDesignComponent[];
  currentComponent: Partial<IDesignComponent> | null;
}

export const initialState: ComponentState = {
  components: [],
  currentComponent: null,
};