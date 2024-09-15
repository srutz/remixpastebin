import { LoaderFunction } from "@remix-run/node";
import { ContentPanel } from "~/shared/components/ContentPanel";
import db from "~/db.server";
import { useLoaderData } from "@remix-run/react";
import { notify } from "~/shared/components/NotificationToast";
import { useEffect, useRef } from "react";

export const loader: LoaderFunction = async ({ params }) => {
    console.log("loading", params)
    const paste = db.prepare("SELECT content, comment, externalid FROM pastes WHERE externalid = ?").get(params.id) as PasteType | undefined
    if (!paste) {
        throw new Response("Not Found", { status: 404 })
    }
    return paste
}

async function copyText(text: string, message: string) {
    if (!text) {
        return
    }
    await navigator.clipboard.writeText(text)
    notify({ message: "Contents copied to clipboard" })
}

export type PasteType = {
    id: number
    content: string
    comment: string
    externalid: string
}

export default function Index() {
    const paste = useLoaderData() as PasteType
    const textarea = useRef<HTMLTextAreaElement|null>(null)
    const handleCopyContent = () => {
        copyText(paste.content, "Contents copied to clipboard")
    }
    const handleCopyLink = () => {
        copyText(window.location.href, "Link copied to clipboard")
    }
    useEffect(() => {
        if (textarea.current) {
            textarea.current.focus()
        }
    }, [textarea.current])
    return (
        <ContentPanel title={<><span className="text-gray-400">Your paste </span><span >{paste.externalid}</span></>}>
            <div className="flex gap-2">
                <button onClick={handleCopyLink}>Copy link</button>
                <button onClick={handleCopyContent}>Copy content</button>
            </div>
            <input name="comment" className="w-full p-2" readOnly value={paste.comment||""}></input>
            <textarea ref={textarea} name="content" className="w-full grow p-2 resize-none" value={paste.content}></textarea>
            <p>Made by Stepan using React, Remix.js, Typescript and Vite</p>
        </ContentPanel>
    )
}

