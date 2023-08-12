import * as React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function addDiary() {

    const onChangeContents = (contents) => {
        console.log(contents);
    }

    return(
        <>
            <div className="">

            </div>
            <ReactQuill onChange={onChangeContents} />
        </>
    )
}