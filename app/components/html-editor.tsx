import EditorJS, { OutputData } from "@editorjs/editorjs";
import React, { memo, useEffect, useRef } from "react";
import { EDITOR_TOOLS } from '../utils/html-editor-tools';

type Props = {
    data?: OutputData;
    onChange(val: OutputData): void;
    holder: string;
}

export const HtmlEditor = ({ data, onChange, holder }: Props) => {
    const ref = useRef<EditorJS>();

    // initialize editorjs
    useEffect(() => {
        // initalize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
            });

            ref.current = editor;
        }

        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    return (<div id={ holder }/>);
}

export default memo(HtmlEditor)