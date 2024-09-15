import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { ContentPanel } from "~/shared/components/ContentPanel";
import db, { generateRandomId } from "~/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    //console.log("action", request)
    const formData = await request.formData()
    const content = formData.get("content")
    console.log("content", content)
    const external_id = generateRandomId(10)
    const stmt = db.prepare("INSERT INTO pastes (content,externalid) VALUES (?,?)")
    const result = stmt.run(content, external_id)
    console.log("result", result)
    return redirect(`/pastebin/pastes/${encodeURIComponent(external_id)}`)
}


export default function Index() {
    return (
        <ContentPanel title="New Paste">
            <Form key={-1} id="new-paste" method="post" className="h-1 grow flex flex-col gap-4">
                <textarea name="content" className="w-full grow p-2 resize-none" placeholder="Paste content here"></textarea>
                <div><button type="submit">Submit Paste</button></div>
            </Form>
        </ContentPanel>
    )
}

