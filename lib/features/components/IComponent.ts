export interface ShowState {
  status: boolean;
  name: string;
}

export interface DesignState {
  state: string;
  currentComponent: IComponent | null;
  color: string;
  image: string;
  rotate: number;
  width: string;
  height: string;
  left: string;
  top: string;
  padding: string;
  fontSize: string;
  fontWeight: string;
  opacity: string;
  text: string;
  zIndex: string;
  radius: number;
  components: IComponent[];
  show: ShowState;
}

// The DesignProperty type as you requested
export type DesignProperty =
  | 'state'
  | 'color'
  | 'image'
  | 'rotate'
  | 'width'
  | 'height'
  | 'left'
  | 'top'
  | 'padding'
  | 'fontSize'
  | 'fontWeight'
  | 'opacity'
  | 'text'
  | 'zIndex'
  | 'radius'
  | 'title';

export interface IComponent {
  name: string;
  type: string;
  id: number;
  height: number;
  width: number;
  zIndex?: number;
  color: string;
  image: string;

  left?: number;
  top?: number;
  opacity?: number;
  rotate?: number;
  radius?: number;

  padding?: number;
  fontSize?: number;
  fontWeight?: number;
  text?: string;
  title?: string;
}

interface ComponentState {
  components: IComponent[];
  currentComponent: Partial<IComponent> | null;
}

export const initialState: ComponentState = {
  components: [],
  currentComponent: null,
};