import { useState, useEffect } from "react";
import { Note } from "../molecules/Note.js"
import { Status } from "../molecules/Status.js"

export const HomeHeader = () => {
    const [level, setLevel] = useState("1");
    const [given_food, setGivenfood] = useState("0");

    useEffect(() => {
        fetch("http://localhost:8000/panda", {method: 'GET'})
        .then((res) => res.json())
        .then(json => {
            setLevel(json.level);
            setGivenfood(json.given_food);
        })
        .catch(() => console.log("error"));
    }, []);

    return (
    <div　className="flex">
        <Note item="0"/>
        <Status level={level} given_food={given_food}/>
    </div>
    );
  };
  