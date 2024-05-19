import {cn} from "@/lib/cn";
import {ReactNode} from "react";

type ControlProps = {
    htmlFor: string;
    label: string;
    children: ReactNode;
};

export function Control({ htmlFor, label, children } : ControlProps) {
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