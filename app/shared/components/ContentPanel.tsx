import { ReactNode } from "react";

export function ContentPanel({ title, children }: { title: string, children: ReactNode }) {
    return (
        <div className="p-10 grow flex flex-col gap-2">
            <div className="font-extrabold text-black text-3xl mb-2">{title}</div>
            {children}
        </div>
    )
}
