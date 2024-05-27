"use client";

import React from 'react';
import { cn } from "@/lib/cn";
import ContentItem from "@/components/shared/ContentCard/ContentItem";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {BaseContent, ContentCardProps, DialogProps} from "@/components/shared/ContentCard/type";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import { setIsDialogOpen } from "@/lib/features/content/contentSlice";

export default function ContentCard<T extends BaseContent>({ states, handleRename, handleDelete }: ContentCardProps<T>) {
  const dispatch = useDispatch();
  const { contents } = states;
  const isDialogOpen = useSelector((state: RootState) => state.content.isDialogOpen);

  const handleDialogOpen = (value: boolean) => {
    dispatch(setIsDialogOpen({ value }));
  }

  return (
    <div>
      <div className={cn("mb-4 mt-1")}>
        <p className={cn("text-xs", "text-greyish/80")}>{contents.length} / 10</p>
      </div>

      <ul className={cn("grid sm:grid-cols-1 md:grid-cols-2 gap-3")}>
        <DialogPrimitive.Root
          open={isDialogOpen}
          onOpenChange={handleDialogOpen}
        >
          {contents.map((contentItem) => (
            <ContentItem<T>
              states={states}
              key={contentItem.id}
              contentItem={contentItem}
              handleRename={handleRename}
              handleDelete={handleDelete}
            />
        ))}
        </DialogPrimitive.Root>
      </ul>
    </div>
  );
}
