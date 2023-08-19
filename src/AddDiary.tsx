import * as React from "react";
import 'react-quill/dist/quill.snow.css';
import QuilEditor from "./component/QuilEditor";
import {useRef, useState} from "react";

export default function AddDiary() {
    const quillRef = useRef();
    const [contents, setContents] = useState("");
    const [isCheck, setCheck] = useState(false);
    const [stickers, setStickers] = useState(0);

    const handleSubmit = async () => {
        console.log(contents);
    }

    const handleSticker = (index) => {
        setStickers(index);
    }

    const stickersList = [
        {
            id: 0,
            icon: '😆'
        },
        {
            id: 1,
            icon: '😃'
        },
        {
            id: 2,
            icon: '😶'
        },
        {
            id: 3,
            icon: '😑'
        },
        {
            id: 4,
            icon: '😥'
        },
        {
            id: 5,
            icon: '😡'
        },
    ];


    return(
        <>
            <div className="select-sticker">
                <button
                    onClick={() => {
                        setCheck((e) => !e);
                    }}
                >
                    {stickersList[stickers].icon}
                </button>
            </div>
            {isCheck && (
                <div>
                    {
                        stickersList.map(function (sticker){
                            return(
                                <button onClick={() => {handleSticker(sticker.id)}}>{sticker.icon}</button>
                            )
                        })
                    }
                </div>
            )}
            <QuilEditor quillRef={quillRef} contents={contents} setContents={setContents}/>
            <button onClick={handleSubmit}>submit</button>
        </>
    )
}