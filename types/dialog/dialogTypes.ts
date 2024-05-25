import { ReactNode } from "react";

export interface DialogProps {
  type: "RENAME" | "DELETE";
  id: string;
  title: string | undefined;
}

export interface RenamePayload {
  id: string;
  title: string;
}

export interface DeletePayload {
  id: string;
}

export interface content {
  id: string;
  title?: string;
  createdAt: Date;
  views?: { count: number };
}

export type DialogPrimitiveType = {
  Root: any;
  Trigger: any;
  Portal: any;
  Overlay: any;
  Content: any;
  RenameDialog: any;
  DeleteDialog: any;
};

export type ContextMenuPrimitiveType = {
  Root: any;
  Trigger: any;
  Portal: any;
  Content: any;
  Item: any;
};

export type useApiType = (url: string, method?: string) => {
  fetchData: (payload: any, queryParams?: string) => Promise<any>;
  loading: boolean;
};
