import {Design} from "@/types";
import {Prisma} from "@prisma/client";

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

export interface IDesignComponent {
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


export interface IDesign extends Design {
  components: IDesignComponent[];
}