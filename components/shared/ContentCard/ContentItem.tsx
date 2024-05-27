import React from 'react';
import { cn } from "@/lib/cn";
import { Edit3, LinkIcon, Trash } from "lucide-react";
import RenameDialog from './RenameDialog';
import DeleteDialog from './DeleteDialog';
import Link from 'next/link';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
  BaseContent,
  ContentItemProps,
  DialogProps,
} from "@/components/shared/ContentCard/type";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import { setDialogProps } from "@/lib/features/content/contentSlice";
import { ISnippet } from "@/app/(code)/constants/ISnippet";

export default function ContentItem<T extends BaseContent>({ key, contentItem, states, handleDelete, handleRename }: ContentItemProps<T>) {
  const dispatch = useDispatch();
  const { isRenaming, isDeleting } = states;
  const routePath = useSelector((state: RootState) => state.content.routePath) || "";
  const dialogProps = useSelector((state: RootState) => state.content.dialogProps);

  const handleSetDialogProps = (value: DialogProps) => {
    dispatch(setDialogProps({ value }));
  }

  // Type guard to check if contentItem has views property
  const hasViews = (item: any): item is ISnippet => 'views' in item;

  return (
    <>
    <ContextMenuPrimitive.Root key={key}>
      <ContextMenuPrimitive.Trigger asChild>
        <li>
          <Link
            id={contentItem.id}
            href={`/${routePath.slice(0, -1)}/${contentItem.id}`}
            className={cn(
              "flex w-full flex-col gap-3 rounded-lg p-3 font-medium",
              "select-none outline-none",
              "border border-white/20 bg-black",
              "transition-all duration-100 ease-in-out",
              "hover:bg-white/20 hover:text-amlost-white",
              "focus:border-almost-white focus:text-amlost-white"
            )}
          >
            <div className={cn("flex items-center gap-2")}>
              <span data-id="title" className={cn("grow truncate")}>
                {contentItem?.title ? `${contentItem?.title}` : "Untitled"}
              </span>
            </div>

            <div className={cn("flex items-center justify-between text-xs")}>
              <span>
                {Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(contentItem.createdAt))}
              </span>
              {hasViews(contentItem) && contentItem.views ? (
                <span>{contentItem.views.count.toLocaleString() ?? "?"} views</span>
              ) : null}
            </div>
          </Link>
        </li>
      </ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          className={cn(
            "z-50 w-40 rounded-lg p-1",
            "border border-white/20 bg-black/50 shadow-lg backdrop-blur-md",
            "animate-in fade-in zoom-in-75 duration-100 ease-in-out"
          )}
        >
          <DialogPrimitive.Trigger asChild>
            <ContextMenuPrimitive.Item
              onClick={() => handleSetDialogProps({ type: "RENAME", id: contentItem.id, title: contentItem.title })}
              className={cn(
                "flex items-center justify-between rounded-[5px] p-1",
                "select-none outline-none",
                "transition-all duration-100 ease-in-out",
                "focus:cursor-pointer focus:bg-white/20 focus:text-amlost-white"
              )}
            >
              <div className={cn("flex items-center gap-2 pl-0.5")}>
                <Edit3 size={16} aria-hidden="true" />
                Rename...
              </div>
            </ContextMenuPrimitive.Item>
          </DialogPrimitive.Trigger>

          {routePath === "snippets" && (
            <ContextMenuPrimitive.Item
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/snippet/${contentItem.id}`)}
              className={cn(
                "flex items-center justify-between rounded-[5px] p-1",
                "select-none outline-none",
                "transition-all duration-100 ease-in-out",
                "focus:cursor-pointer focus:bg-white/20 focus:text-amlost-white"
              )}
            >
              <div className={cn("flex items-center gap-2 pl-0.5")}>
                <LinkIcon size={16} aria-hidden="true" />
                Copy link
              </div>
            </ContextMenuPrimitive.Item>
          )}

          <DialogPrimitive.Trigger asChild>
            <ContextMenuPrimitive.Item
              onClick={() => handleSetDialogProps({ type: "DELETE", id: contentItem.id, title: contentItem.title })}
              className={cn(
                "flex items-center justify-between rounded-[5px] p-1",
                "select-none outline-none",
                "transition-all duration-100 ease-in-out",
                "focus:cursor-pointer focus:bg-white/20 focus:text-amlost-white"
              )}
            >
              <div className={cn("flex items-center gap-2 pl-0.5")}>
                <Trash size={16} aria-hidden="true" />
                Delete
              </div>
            </ContextMenuPrimitive.Item>
          </DialogPrimitive.Trigger>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>

      <DialogPrimitive.Portal>
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center"
          )}
        >
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-50",
              "bg-black/50 backdrop-blur",
              "transition-all duration-100 ease-in-out",
              "radix-state-open:animate-in radix-state-open:fade-in",
              "radix-state-closed:animate-out radix-state-closed:fade-out"
            )}
          />

          <DialogPrimitive.Content
            className={cn(
              "z-50 w-[640px] min-w-min rounded-xl p-6",
              "border border-white/20 bg-black shadow-xl",
              "transition-all duration-100 ease-in-out",
              "radix-state-open:animate-in radix-state-open:fade-in radix-state-open:zoom-in-75"
            )}
          >
            {dialogProps?.type === "RENAME" && (
              <RenameDialog
                id={dialogProps.id}
                title={dialogProps.title}
                action={handleRename}
                isLoading={isRenaming}
              />
            )}

            {dialogProps?.type === "DELETE" && (
               <DeleteDialog
                 id={dialogProps.id}
                 title={dialogProps.title}
                 action={handleDelete}
                 isLoading={isDeleting}
               />
             )}

          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
  </>
  );
}
