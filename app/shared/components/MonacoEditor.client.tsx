/* (c) Stepan Rutz. All rights reserved. */

import * as monaco from 'monaco-editor'
import '../../MonacoInit'
import { useEffect, useRef, useState } from 'react'
import { useResizeObserver } from '../hooks/ResizeObserver'


export type MonacoEditorProps = {
    value: string
    language?: string
    readonly?: boolean
}

/*
 * This is a simple wrapper around the monaco editor
 * for use in react components.
 */

export function MonacoEditor(props: MonacoEditorProps) {
    const { value = "", language = "typescript", readonly = false } = props

    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef<HTMLDivElement>(null);

    const adjustSize = () => {
        if (monacoEl.current && editor) {
            const esize = { width: monacoEl.current.offsetWidth || 0, height: monacoEl.current.offsetHeight || 0 }
            editor.layout({ width: esize.width, height: esize.height})
        }
    }

	useEffect(() => {
        if (!monacoEl.current) {
            return
        }
        setEditor((editor) => {
            if (editor) {
                return editor
            }
            console.log("building monaco editor with value", value)
            const monacoEditor = monaco.editor.create(monacoEl.current!, {
                value: value,
                model: null,
                language: language,
                readOnly: readonly,
                minimap: { enabled: false },
            })
            monacoEditor.getModel()?.onDidChangeContent((event) => {
                console.log("monaco editor content changed", event)
            })
            return monacoEditor
        })

        return () => editor?.dispose()
	}, [monacoEl.current])

    const size = useResizeObserver(monacoEl)
    adjustSize()
    //console.log("rendering monaco editor... " + editor + " // " + StringUtil.limit(value, 32));
    if (editor) {
        editor.setValue(value)
    }
	return (
        <div className="h-1 grow w-full" ref={monacoEl}></div>
    )
}
