import { LoaderFunction } from "@remix-run/node";
import { ContentPanel } from "~/shared/components/ContentPanel";
import db from "~/db.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
    console.log("loading", params)
    const paste = db.prepare("SELECT content, externalid FROM pastes WHERE externalid = ?").get(params.id) as PasteType | undefined
    if (!paste) {
        throw new Response("Not Found", { status: 404 })
    }
    return paste
}

export type PasteType = {
    id: number
    content: string
    externalid: string
}

export default function Index() {
    const paste = useLoaderData() as PasteType
    return (
        <ContentPanel title={"Your Paste " + paste.externalid}>
            <textarea className="w-full grow p-2 resize-none" readOnly value={paste.content || ""}></textarea>
            <p>Made using React, Remix.js, Typescript and Vite</p>
        </ContentPanel>
    )
}

