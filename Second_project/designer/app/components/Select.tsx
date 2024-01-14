
interface SelectProps<T> {
  type: "language" | "theme" | "font";
  initialValue: T;
  setValue: (_: T) => void;
  options: T[];
}

function ThemeBubble({ color }: { color: string }) {
  return (
      <span
          className={clsx("block h-4 w-4 rounded-full bg-gradient-to-br", color)}
      />
  );
}
