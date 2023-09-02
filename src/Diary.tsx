import * as React from "react";

export default function Diary() {
    const diaryArr = JSON.parse(localStorage.getItem("2023. 9. 1."))

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