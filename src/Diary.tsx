import * as React from "react";

export default function Diary() {

    const contents = JSON.parse(localStorage.getItem("content"));
    const sticker = JSON.parse(localStorage.getItem("sticker"));

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