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
import dayjs from 'dayjs';
import { CustomButton } from "../atoms/CustomButton";
import FoodApi from "../../api/FoodApi"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

function Register(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("野菜");
  const [state, setState] = useState("常温");
  const [date, setDate] = useState(dayjs().add(14, 'day'));
  const [error, setError] = useState(false);

  const foodApi = new FoodApi();
  const navigate = useNavigate();


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
    setDate(dayjs().add(days, "day"));
  }

  const submit = () => {
    if (name == "") {
      setError(true);
      return;
    }
    var d = date.format("YYYY-MM-DD");
    var data = { "food_add": { "food_name": name, "category": category, "expiration_date": d, "storage_state": state } };
    foodApi.registerFood(data);
    console.log(data);
    navigate(ROUTES.HOME);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ padding: "10px" }}>
        <p style={{ color: "#563F32", padding: "0px 24px", fontWeight: "bold" }}>食品名</p>
        <TextField
          required id="filled-basic" label="食品名" variant="standard"
          onChange={(e) => {
            setName(e.target.value);
            if (name == "") {
              setError(true);
            } else {
              setError(false);
            }
          }}
          error={error}
        />
      </div>

      <div style={{ padding: "10px" }}>
        <p style={{ color: "#563F32", padding: "0px 24px", fontWeight: "bold" }}>カテゴリー</p>
        <div style={{ color: "#563F32", width: "100px", margin: "auto" }}>
          <Select defaultValue="野菜" onChange={(e) => { setCategory(e.target.innerText); changeDate(e.target.innerText, state); }}>
            <Option value="野菜" color="#563F32">野菜</Option>
            <Option value="肉">肉</Option>
            <Option value="魚">魚</Option>
            <Option value="牛乳">牛乳</Option>
            <Option value="卵">卵</Option>
            <Option value="果物">果物</Option>
          </Select>
        </div>
      </div>

      <div style={{ padding: "10px" }}>
        <p style={{ color: "#563F32", padding: "0px 24px", fontWeight: "bold" }}>保存場所</p>
        <div style={{ color: "#563F32", width: "250px", margin: "auto" }}>
          <FormControl>
            <RadioGroup orientation="horizontal" defaultValue="常温" onChange={(e) => { setState(e.target.value); changeDate(category, e.target.value); }}>
              <Radio value="常温" label="常温" variant="soft" color="warning" />
              <Radio value="冷蔵" label="冷蔵" variant="soft" color="warning" />
              <Radio value="冷凍" label="冷凍" variant="soft" color="warning" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div style={{ padding: "10px" }}>
        <p style={{ color: "#563F32", padding: "0px 24px", fontWeight: "bold" }}>消費/賞味期限</p>
        <div style={{ color: "#563F32", width: "200px", margin: "auto", fontWeight: "bold" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileDatePicker"]}>
              <MobileDatePicker
                value={date}
                disablePast={true}
                onChange={(value) => { setDate(value) }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>

      <div style={{ padding: "10px" }}>
        <CustomButton onClick={submit}>追加</CustomButton>
      </div>
    </div>
  );
}

export default Register;
