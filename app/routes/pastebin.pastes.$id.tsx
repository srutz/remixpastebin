import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { ContentPanel } from "~/shared/components/ContentPanel";
import db from "~/db.server";
import { redirect, useFetcher, useLoaderData } from "@remix-run/react";
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

export const action = async ({ request, params}: ActionFunctionArgs) => {
    console.log("action", request)
    console.log("params", params)
    const external_id = params.id
    if (!external_id) {
        return
    }
    const stmt = db.prepare("DELETE FROM pastes WHERE externalid = ?")
    const result = stmt.run(external_id)

    return redirect(`/pastebin/new`)
}

async function copyText(text: string, message: string) {
    if (!text) {
        return
    }
    await navigator.clipboard.writeText(text)
    notify({ message: message })
}

export type PasteType = {
    id: number
    content: string
    comment: string
    externalid: string
}

export default function Index() {
    const paste = useLoaderData() as PasteType
    const fetcher = useFetcher()
    const textarea = useRef<HTMLTextAreaElement|null>(null)
    const handleCopyContent = () => {
        copyText(paste.content, "Contents copied to clipboard")
    }
    const handleCopyLink = () => {
        copyText(window.location.href, "Link copied to clipboard")
    }
    const handleDelete = () => {
        const data = new FormData()
        data.set("externalid", paste.externalid)
        const externalid = paste.externalid
        if (externalid) {
            fetcher.submit(null, {
                method: "delete",
                action: `/pastebin/pastes/${encodeURIComponent(externalid)}`,
            })
            notify({ message: "Your paste was deleted" })
        }
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
                <button className="redbutton" onClick={handleDelete}>Delete paste</button>
            </div>
            <input name="comment" className="w-full p-2 text-sm" readOnly value={paste.comment||""}></input>
            <textarea ref={textarea} name="content" spellCheck="false" wrap="off" autoCorrect="off" className="w-full grow p-2 resize-none text-sm" onChange={() => {}} value={paste.content}></textarea>
            <p>Made by Stepan using React, Remix.js, Typescript and Vite</p>
        </ContentPanel>
    )
}

