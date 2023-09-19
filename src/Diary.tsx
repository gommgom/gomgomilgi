import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Diary(date) {
    const navigate = useNavigate();
    const diaryArr = JSON.parse(localStorage.getItem(date));
    if (diaryArr === null) {
        navigate("/addDiary");
        return null;
    }

    const contents = diaryArr[0].content
    const sticker = diaryArr[1].sticker

    return(
        <>
            <div>
                {sticker}
            </div>

            <div dangerouslySetInnerHTML={ {__html: contents} }>
            </div>

        </>
    )
}