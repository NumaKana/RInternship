import { useState, useEffect } from "react";
import { Note } from "../molecules/Note.js";
import { Status } from "../molecules/Status.js";
import PandaApi from "../../api/PandaApi.js";

export const HomeHeader = () => {
    const [level, setLevel] = useState("1");
    const [given_food, setGivenfood] = useState("0");

    // useEffect(() => {
    //     const panda = new PandaApi;
    //     const panda_status = panda.getPanda();
    //     console.log(panda_status);
    //     setLevel(panda_status.level);
    //     setGivenfood(panda_status.given_food);
    // }, []);

    return (
    <div　className="flex mx-2 py-5">
        <Note item="0"/>
        <Status level={level} given_food={given_food}/>
    </div>
    );
  };
  