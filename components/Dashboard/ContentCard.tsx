"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import RenameDialog from "./RenameDialog";
import DeleteDialog from "./DeleteDialog";
import { cn } from "@/lib/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import Link from "next/link";
import { Edit3, LinkIcon, Trash } from "lucide-react";
import Kbd from "@/components/shared/ui/Kbd";
import useApi from "@/utils/useApi";

interface DialogProps {
  type: "RENAME" | "DELETE";
  id: string;
  title: string | undefined;
}

interface RenamePayload {
  id: string;
  title: string;
}

interface DeletePayload {
  id: string;
}

interface content {
  id: string;
  title?: string;
  createdAt: Date;
  views?: { count: number };
}

interface ContentProps {
  contents: content[];
  routePath: string;
}

export default function ContentCard({ contents, routePath } : ContentProps) {
  const [allData, setAllData] = useState(contents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLAnchorElement | null>(
    null
  );

  const listContainerRef = useRef<HTMLUListElement>(null);
  const previouslyHoveredElementRef = useRef<HTMLAnchorElement | null>(null);

  const { fetchData: rename, loading: renameLoading } = useApi(`/api/v1/${routePath}`, 'PATCH');
  const { fetchData: deleteElement, loading: deleteLoading } = useApi(`/api/v1/${routePath}`, 'DELETE');

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        !dialogOpen &&
        hoveredElement &&
        !e.metaKey &&
        !e.ctrlKey &&
        e.key !== "Tab"
      ) {
        const id = hoveredElement.id;
        const title = (
          hoveredElement.querySelector('[data-id="title"]') as HTMLSpanElement
        ).innerText;
        console.log(id)
        console.log(title)

        if (id && title) {
          e.preventDefault();

          switch (e.key) {
            case "r":
              setDialogProps({ type: "RENAME", id, title });
              setDialogOpen(true);
              break;
            case "d":
              setDialogProps({ type: "DELETE", id, title });
              setDialogOpen(true);
              break;
            case "c":
              navigator.clipboard.writeText(`${window.location.origin}/${id}`);
              break;
          }
        }
      }
    },
    [hoveredElement, dialogOpen]
  );

  const handleEvent = useCallback(
    (e: MouseEvent | FocusEvent, isMouseOut: boolean) => {
      const target = e.target as HTMLElement;
      const closestLink = target.closest("a");

      if (isMouseOut) {
        setHoveredElement(null);

        previouslyHoveredElementRef.current = null;
      } else if (closestLink && closestLink !== previouslyHoveredElementRef.current) {
        setHoveredElement(closestLink as HTMLAnchorElement);

        previouslyHoveredElementRef.current = closestLink;
      }
    },
    []
  );

  useEffect(() => {
    const ulElement = listContainerRef.current;

    if (ulElement) {
      ulElement.addEventListener("mouseover", (e) => handleEvent(e, false));
      ulElement.addEventListener("mouseout", (e) => handleEvent(e, true));
      ulElement.addEventListener("focusin", (e) => handleEvent(e, false));
      ulElement.addEventListener("focusout", (e) => handleEvent(e, true));

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        ulElement.removeEventListener("mouseover", (e) => handleEvent(e, false));
        ulElement.removeEventListener("mouseout", (e) => handleEvent(e, true));
        ulElement.removeEventListener("focusin", (e) => handleEvent(e, false));
        ulElement.removeEventListener("focusout", (e) => handleEvent(e, true));

        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleEvent, handleKeyDown]);

  const handleRename = async (payload: RenamePayload) => {
    const res = await rename(payload);
    if (res?.data?.id) {
      setAllData(prev =>
          prev.map(item => item.id === payload?.id ? { ...item, title: res?.data?.title } : item)
      );
    }
  }

  const handleDelete =  async (payload: DeletePayload) => {
    const res = await deleteElement(payload, `?id=${payload?.id}`);
    if (res?.data?.id) {
      setAllData(prev => prev.filter(item => item.id !== payload?.id));
    }
  }

  function renderDialog() {
    if (dialogProps?.type === "RENAME") {
      return (
        <RenameDialog
          id={dialogProps.id}
          title={dialogProps.title}
          action={handleRename}
          isLoading={renameLoading}
        />
      );
    }

    if (dialogProps?.type === "DELETE") {
      return (
        <DeleteDialog
          id={dialogProps.id}
          title={dialogProps.title}
          action={handleDelete}
          isLoading={deleteLoading}
        />
      );
    }

    return null;
  }

  if (!allData.length) {
    return (
      <div
        className={cn(
          "flex items-center justify-center py-6",
          "text-greyish/80"
        )}
      >
        <span>No {`${routePath}`} found</span>
      </div>
    );
  }

  return (
    <div>
      <div className={cn("mb-4 mt-1")}>
        <p className={cn("text-xs", "text-greyish/80")}>
          {allData.length} / 10
        </p>
      </div>

      <ul ref={listContainerRef} className={cn("grid sm:grid-cols-1 md:grid-cols-2 gap-3")}>
        <DialogPrimitive.Root
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        >
          {allData.map(
            ({ id, title, createdAt, views = undefined }) => (
              <ContextMenuPrimitive.Root key={id}>
                <ContextMenuPrimitive.Trigger asChild>
                  <li>
                    <Link
                      id={id}
                      href={`/${routePath.slice(0, -1)}/${id}`}
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
                          {title ? `${title}` : "Untitled"}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "flex items-center justify-between text-xs"
                        )}
                      >
                        <span>
                          {Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }).format(new Date(createdAt))}
                        </span>
                        {views
                          ? (
                              <span>
                                {views?.count.toLocaleString() ?? "?"} views
                              </span>
                            )
                            : null
                        }
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
                        onClick={() =>
                          setDialogProps({ type: "RENAME", id, title })
                        }
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

                        <Kbd keys={["R"]} />
                      </ContextMenuPrimitive.Item>
                    </DialogPrimitive.Trigger>
                    {
                      routePath === 'snippets'
                        && (
                          <ContextMenuPrimitive.Item
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `${window.location.origin}/snippet/${id}`
                              )
                            }
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

                            <Kbd keys={["C"]} />
                          </ContextMenuPrimitive.Item>
                        )
                    }
                    <DialogPrimitive.Trigger asChild>
                      <ContextMenuPrimitive.Item
                        onClick={() =>
                          setDialogProps({ type: "DELETE", id, title })
                        }
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

                        <Kbd keys={["D"]} />
                      </ContextMenuPrimitive.Item>
                    </DialogPrimitive.Trigger>
                  </ContextMenuPrimitive.Content>
                </ContextMenuPrimitive.Portal>
              </ContextMenuPrimitive.Root>
            )
          )}

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
                {renderDialog()}
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </ul>
    </div>
  );
}