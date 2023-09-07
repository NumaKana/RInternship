import { useState, useEffect } from "react";
import { Note } from "../molecules/Note.js";
import { Status } from "../molecules/Status.js";
import PandaApi from "../../api/PandaApi.js";

export const HomeHeader = (props) => {

    return (
    <div　className="flex mx-2 py-5">
        <Note item="0"/>
        <Status level={props.level} given_food={props.given_food} exp={props.exp}/>
    </div>
    );
  };
  