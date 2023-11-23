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

    const date = new Date(localStorage.getItem("selectedDate"));
    const dateString = date.toLocaleDateString();
    console.log(dateString);

    let diaryArr;

    const handleSubmit = async () => {
        diaryArr = {content: contents, sticker: stickersList[stickers].icon};

        window.localStorage.setItem(dateString, JSON.stringify(diaryArr))

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
            <div>
                {date.toLocaleDateString()}
            </div>
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