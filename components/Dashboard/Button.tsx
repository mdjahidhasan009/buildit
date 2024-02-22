"use client";
import { cn } from "@/lib/cn";
import { Check, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Loader from "@/components/shared/ui/Loader";
import useApi from "@/utils/useApi";

type ButtonType = "DEFAULT" | "SUCCESS" | "ERROR";

interface Button {
  id: string;
  text: string;
  icon: JSX.Element;
  additionClasses: string;
}

const buttons: Record<ButtonType, Button> = {
  DEFAULT: {
    id: "default",
    text: "New",
    icon: <Plus size={16} aria-hidden="true" />,
    additionClasses:
      "border-white/20 bg-black hover:bg-white/20 hover:text-almost-white disabled:brightness-50",
  },
  SUCCESS: {
    id: "success",
    text: "Success",
    icon: <Check size={16} aria-hidden="true" />,
    additionClasses: "border-green-400/20 text-green-400 bg-green-500/20",
  },
  ERROR: {
    id: "error",
    text: "Error",
    icon: <X size={16} aria-hidden="true" />,
    additionClasses: "border-red-400/20 text-red-400 bg-red-500/20",
  },
};

export default function Button({ snippetCount }: { snippetCount: number }) {
  const [buttonState, setButtonState] = useState<ButtonType>("DEFAULT");

  const router = useRouter();
  const { fetchData: createSnippet, data, error, loading: createLoading } = useApi("/api/v1/snippets", 'POST');

  const handleAction = async () => {
    try {
      const result = await createSnippet({ snippetCount });
      const { id } = result;
      setButtonState("SUCCESS");
      router.push(`/${id}`);
    } catch (e) {
      console.error(e);
      setButtonState("ERROR");
    } finally {
      const timer = setTimeout(() => setButtonState("DEFAULT"), 2500);

      return () => clearTimeout(timer);
    }
  };

  useHotkeys(
    "n",
    () => {
      if (!createLoading && buttons[buttonState].id === "default") {
        handleAction();
      }
    },
    {
      preventDefault: true,
    }
  );

  return (
    <button
      type="button"
      onClick={() => handleAction()}
      disabled={
        snippetCount >= 10 ||
        createLoading ||
        buttons[buttonState].id !== "default"
      }
      className={cn(
        "flex w-auto items-center gap-4 rounded-lg p-1 font-medium",
        "select-none outline-none",
        "border",
        "transition-all duration-100 ease-in-out",
        buttons[buttonState].additionClasses,
        "focus:border-amlost-white focus:text-amlost-white",
        "disabled:cursor-not-allowed"
      )}
    >
      <div className={cn("flex items-center gap-2 pl-0.5")}>
        {createLoading ? <Loader /> : buttons[buttonState].icon}
        {buttons[buttonState].text}
      </div>
    </button>
  );
}
