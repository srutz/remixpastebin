

import * as monaco from 'monaco-editor';
import { useResizeObserver } from '../hooks/ResizeObserver';
import { useEffect, useRef, useState } from 'react';


/* use the monaca editor from react */
export function MonacoEditor(props: {
    value: string
    language?: string
    readonly?: boolean
}) {
    const { value = "", language = "typescript", readonly = false } = props

    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLDivElement>(null);
    const size = useResizeObserver(monacoEl)

    const adjustSize = () => {
        if (monacoEl.current && editor) {
            const esize = { width: monacoEl.current.offsetWidth || 0, height: monacoEl.current.offsetHeight || 0 }
            editor.layout({ width: esize.width, height: esize.height })
        }
    }

    useEffect(() => {
        if (!monacoEl.current) {
            return
        }
        setEditor((editor: any) => {
            if (editor) {
                return editor
            }
            const monacoEditor = monaco.editor.create(monacoEl.current!, {
                value: value,
                language: language,
                readOnly: readonly,
                minimap: { enabled: false },
            })
            return monacoEditor
        })
        return () => editor?.dispose()
    }, [monacoEl.current])
    adjustSize()
    if (editor) {
        editor.setValue(value)
    }
    return (
        <div className="h-1 grow w-full" ref={monacoEl}></div>
    )
}
