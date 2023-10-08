import * as React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/AddDiary.module.css";

export default function Diary() {
    const navigate = useNavigate();
    /*
    const diaryArr = JSON.parse(localStorage.getItem(date));
    console.log(diaryArr);

    if (diaryArr === null) {
        navigate("/addDiary");
        return null;
    }

     */

    const dataString = localStorage.getItem("selectedDate");
    const diaryString = JSON.parse(localStorage.getItem(dataString));


    const contents = diaryString.content
    const sticker = diaryString.sticker

    const handleSubmit = async () => {

        navigate("/");
    }

    return(
        <>
            <div>
                {sticker}
            </div>

            <div dangerouslySetInnerHTML={ {__html: contents} }>
            </div>

            <button
                className={styles.btnSubmit}
                onClick={handleSubmit}>돌아가기</button>

        </>
    )
}