import React, { useState } from "react";

function Register(props) {
  const STATE = ["常温", "冷蔵", "冷凍"];
  const CATEGORY = ["野菜", "肉", "魚", "牛乳", "卵", "果物"];

  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [state, setState] = useState("常温");
  const [date, setDate] = useState(null);

  const onRadioBtnChanged = (e) => setState(e.target.value);

  return (
    <div>
      <p>食品登録</p>
      <input onChange={(e) => { setName(e) }}></input>
      <p>カテゴリー</p>
      {STATE.map((radioValue) => (
        <label key={radioValue}>
          <input
            type="radio"
            value={radioValue}
            name="sample"
            onChange={onRadioBtnChanged}
            checked={radioValue == state}
          />
          {radioValue}
        </label>
      ))}
      <button onClick={(e) => { }}>追加</button>
    </div>
  );
}

export default Register;
