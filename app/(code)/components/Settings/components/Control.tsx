import {cn} from "@/lib/cn";

export function Control({
                            htmlFor,
                            label,
                            children,
                        }: {
    htmlFor: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn("relative flex min-w-max flex-col justify-between gap-3 ")}
        >
            <label htmlFor={htmlFor} className={cn("text-xs font-bold")}>
                {label}
            </label>
            {children}
        </div>
    );
}