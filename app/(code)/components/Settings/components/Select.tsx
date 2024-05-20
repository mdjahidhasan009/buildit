import { cn } from "@/lib/cn";
import * as SelectPrimitive from "@radix-ui/react-select";
import { memo, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface OptionWithId {
  id: string;
}

interface SelectProps<T extends OptionWithId> {
  type: string;
  options: T[];
  currentValue: string;
  onValueChange: (value: string) => void;
  getInitialValue: (value: T) => ReactNode;
  renderOption: (option: T) => ReactNode;
}

export default memo(function Select<T extends OptionWithId>({
  type,
  options,
  currentValue,
  onValueChange,
  getInitialValue,
  renderOption,
}: SelectProps<T>) {
  const selectedOption = options.find(option => option.id.toLowerCase() === currentValue.toLowerCase()) || null;

  if (!selectedOption) {
    return null;
  }

  return (
    <SelectPrimitive.Root
      defaultValue={currentValue}
      value={currentValue}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger
        className={cn(
          "flex h-8 w-auto items-center justify-between gap-2 rounded-lg px-2",
          "select-none outline-none",
          "border border-white/20 bg-black",
          "transition-all duration-100 ease-in-out",
          "hover:bg-white/20 hover:text-amlost-white",
          "focus:text-amlost-white focus:ring-1 focus:ring-amlost-white focus:ring-offset-2 focus:ring-offset-black",
          { "w-32": type === "language", "w-44": type === "fontFamily" }
        )}
        aria-label={`${type}-select`}
      >
        <SelectPrimitive.Value>{getInitialValue(selectedOption)}</SelectPrimitive.Value>
        <SelectPrimitive.Icon>
          <ChevronDown size={16} aria-hidden="true" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={-100}
          align="center"
          className={cn(
            "relative z-50 overflow-hidden rounded-lg p-1",
            "border border-white/20 bg-black/50 shadow-lg backdrop-blur-md",
            "animate-in fade-in zoom-in-75 duration-100 ease-in-out"
          )}
        >
          <SelectPrimitive.Viewport>
            {options.map(option => (
              <SelectPrimitive.Item
                key={`${type}-${option.id}`}
                value={option.id}
                className={cn(
                  "rounded-[5px] p-1.5",
                  "select-none outline-none",
                  "transition-all duration-100 ease-in-out",
                  "radix-highlighted:bg-white/20 radix-highlighted:text-amlost-white"
                )}
              >
                <SelectPrimitive.ItemText>
                  {renderOption(option)}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});
