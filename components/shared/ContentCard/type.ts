export interface BaseContent {
  id: string;
  title?: string | null;
  createdAt: Date;
}

export type ContentCardType = "RENAME" | "DELETE";

export interface DialogProps {
  type: ContentCardType;
  id: string;
  title: string | undefined | null;
}

export interface ContentCardProps<T extends BaseContent> {
  states: {
    contents: T[];
    isRenaming: boolean;
    isDeleting: boolean;
  }
  handleRename: (payload: IContentRenamePayload) => void;
  handleDelete: (payload: IContentDeletePayload) => void;
}

export interface IContentRenamePayload {
  id: string;
  title: string;
}

export interface IContentDeletePayload {
  id: string;
}

export interface ContentItemProps<T> {
  contentItem: T;
  key: string;
  states: {
    contents: T[];
    isRenaming: boolean;
    isDeleting: boolean;
  }
  handleRename: (payload: IContentRenamePayload) => void;
  handleDelete: (payload: IContentDeletePayload) => void;
}

export interface IContentRenameProps {
  id: string;
  title: string | undefined | null;
  action: (payload: IContentRenamePayload) => void;
  isLoading: boolean;
}