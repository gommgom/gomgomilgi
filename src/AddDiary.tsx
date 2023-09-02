import * as React from "react";
import 'react-quill/dist/quill.snow.css';
import QuilEditor from "./component/QuilEditor";
import {useRef, useState} from "react";
import styles from "./styles/AddDiary.module.css"
import { useNavigate } from "react-router-dom";

export default function AddDiary() {
    const quillRef = useRef();
    const [contents, setContents] = useState("");
    const [isCheck, setCheck] = useState(false);
    const [stickers, setStickers] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        window.localStorage.setItem("content", JSON.stringify(contents));
        window.localStorage.setItem("sticker", JSON.stringify(stickersList[stickers].icon));

        navigate("/diary");
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
            <div className={styles.divSticker}>
                <div>
                    <button
                        className={styles.btnSticker}
                        onClick={() => {
                            setCheck((e) => !e);
                        }}
                    >
                        {stickersList[stickers].icon}
                    </button>
                </div>
                <div>
                    {isCheck && (
                        <div>
                            {
                                stickersList.map(function (sticker){
                                    return(
                                        <button
                                            className={styles.btnSticker}
                                            onClick={() => {handleSticker(sticker.id)}}>{sticker.icon}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
            <QuilEditor quillRef={quillRef} contents={contents} setContents={setContents}/>

            <button
                className={styles.btnSubmit}
                onClick={handleSubmit}>submit</button>

        </>
    )
}