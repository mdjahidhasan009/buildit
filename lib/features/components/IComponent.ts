export interface ShowState {
  status: boolean;
  name: string;
}

export interface DesignState {
  state: string;
  currentComponent: Component | null;
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
  components: Component[];
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

export interface Component {
  name: string;
  type: string;
  id: number;
  height: number;
  width: number;
  zIndex: number;
  color: string;
  image: string;
}

export const initialState: Pick<DesignState, 'components'> = {
  components: [],
};