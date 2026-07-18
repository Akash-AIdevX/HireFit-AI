"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ATSGauge({
    score,
}:{
    score:number
}){

    return(

        <div className="w-60">

            <CircularProgressbar

                value={score}

                text={`${score}%`}

            />

        </div>

    )

}