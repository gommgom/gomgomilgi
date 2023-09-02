import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, {memo, useMemo,} from "react";


type QuillEditorProps = {
    quillRef: any;
    contents: string;
    setContents: (val: string) => void;
}

const QuilEditor = memo(({quillRef, contents, setContents} : QuillEditorProps) => {
    let bold = Quill.import('formats/bold');
    bold.tagName = 'b';
    Quill.register(bold, true);

    let italic = Quill.import('formats/italic');
    italic.tagName = 'i';
    Quill.register(italic, true);

    const modules = useMemo(
        () => ({
            toolbar: { // 툴바에 넣을 기능
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        // { list: "ordered" },
                        // { list: "bullet" },
                        // { indent: "-1" },
                        // { indent: "+1" },
                        { align: [] },
                    ],
                ],
                handlers: {},
            }
        }), []
    )

    return (
        <>
            <ReactQuill
                ref={(element: any) => {
                    quillRef.current = element;
                }}
                value={contents}
                onChange={setContents}
                modules={modules}
            />
        </>
    )
})

export default QuilEditor