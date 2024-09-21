import { MonacoEditor } from "./MonacoEditor.client";

export function Editor({ value }: { value: string }) {
    //return <div>yo</div>
    return <MonacoEditor value={value}></MonacoEditor>
}