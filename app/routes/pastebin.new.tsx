import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { ContentPanel } from "~/shared/components/ContentPanel";
import db, { generateRandomId } from "~/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    //console.log("action", request)
    const formData = await request.formData()
    const content = formData.get("content") || ""
    const comment = formData.get("comment") || ""
    const external_id = generateRandomId(8)
    const stmt = db.prepare("INSERT INTO pastes (content,comment,externalid) VALUES (?,?,?)")
    const result = stmt.run(content, comment, external_id)
    return redirect(`/pastebin/pastes/${encodeURIComponent(external_id)}`)
}

export default function Index() {
    return (
        <ContentPanel title="New Paste">
            <Form key={-1} id="new-paste" method="post" className="h-1 grow flex flex-col gap-4">
                <input name="comment" className="w-full p-2 text-sm" placeholder="Paste comment"></input>
                <textarea name="content" spellCheck="false" wrap="off" autoCorrect="off" className="w-full grow p-2 resize-none text-sm" placeholder="Paste content here"></textarea>
                <div><button type="submit">Submit Paste</button></div>
            </Form>
        </ContentPanel>
    )
}

