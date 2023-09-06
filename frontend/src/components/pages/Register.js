import { useState } from "react";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { FormControl } from '@mui/base/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import "../../App.css"

function Register(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("野菜");
  const [state, setState] = useState("常温");
  const [date, setDate] = useState(dayjs().add(14, 'day'));
  const [addDays, setAddDays] = useState(14);

  const CATEGORIES = ["野菜", "肉", "魚", "牛乳", "卵", "果物"];

  const changeDate = (cat, val) => {
    let days = 0;
    switch (cat) {
      case "野菜":
        days += 14;
        break;
      case "肉":
        days += 1;
        break;
      case "魚":
        days += 1;
        break;
      case "牛乳":
        days += 1;
        break;
      case "卵":
        days += 7;
        break;
      case "果物":
        days += 14;
        break;
    }
    switch (val) {
      case "冷蔵":
        days += 7;
        break;
      case "冷凍":
        days += 14;
        break;
    }
    setDate(date.add(days - addDays, "day"));
    setAddDays(days);
  }

  return (
    <div>
      <p>食品登録</p>

      <p>食品名</p>
      <TextField id="filled-basic" label="食品名" variant="standard" onChange={(e) => { setName(e.target.value) }} required />

      <p>カテゴリー</p>
      <Select defaultValue="野菜" onChange={(e) => { setCategory(e.target.innerText); changeDate(e.target.innerText, state); }}>
        <Option value="野菜">野菜</Option>
        <Option value="肉">肉</Option>
        <Option value="魚">魚</Option>
        <Option value="牛乳">牛乳</Option>
        <Option value="卵">卵</Option>
        <Option value="果物">果物</Option>
      </Select>

      <p>保存場所</p>
      <FormControl>
        <RadioGroup defaultValue="常温" onChange={(e) => { setState(e.target.value); changeDate(category, e.target.value); }}>
          <Radio value="常温" label="常温" variant="常温" />
          <Radio value="冷蔵" label="冷蔵" variant="冷蔵" />
          <Radio value="冷凍" label="冷凍" variant="冷凍" />
        </RadioGroup>
      </FormControl>

      <p>消費/賞味期限</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileDatePicker"]}>
          <MobileDatePicker
            value={date}
            disablePast={true}
            onChange={(value) => { setDate(value) }} />
        </DemoContainer>
      </LocalizationProvider>
      {/* <p>{name}</p>
      <p>{category}</p>
      <p>{state}</p>
      <p>{date.format()}</p> */}
      <Button variant="contained">追加</Button>
    </div>
  );
}

export default Register;
