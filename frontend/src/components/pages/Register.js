import { useState } from "react";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { FormControl } from "@mui/base/FormControl";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { CustomButton } from "../atoms/CustomButton";
import FoodApi from "../../api/FoodApi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

function Register(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("野菜");
  const [state, setState] = useState("常温");
  const [date, setDate] = useState(dayjs().add(14, "day"));
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
  };

  const submit = () => {
    if (name == "") {
      setError(true);
      return;
    }
    var d = date.format("YYYY-MM-DD");
    var data = {
      food_add: {
        food_name: name,
        category: category,
        expiration_date: d,
        storage_status: state,
      },
    };
    foodApi.registerFood(data);
    console.log(data);
    navigate(ROUTES.HOME);
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "300px",
        padding: "10px",
        margin: "0 auto",
      }}
    >
      <div className="mb-4">
        <p style={{ color: "#563F32", fontWeight: "bold", textAlign: "left" }}>
          食品名
        </p>
        <TextField
          required
          id="filled-basic"
          label="食品名"
          variant="standard"
          size="small"
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value == "") {
              setError(true);
            } else {
              setError(false);
            }
          }}
          error={error}
          sx={{
            width: "100%",
          }}
        />
      </div>

      <div className="mb-4">
        <p
          style={{
            color: "#563F32",
            padding: "0px 24px 10px 0px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          カテゴリー
        </p>
        <div style={{ color: "#563F32" }}>
          <Select
            defaultValue="野菜"
            onChange={(e) => {
              setCategory(e.target.innerText);
              changeDate(e.target.innerText, state);
            }}
            sx={{ width: "100%" }}
          >
            <Option value="野菜" color="#563F32">
              野菜
            </Option>
            <Option value="肉">肉</Option>
            <Option value="魚">魚</Option>
            <Option value="牛乳">牛乳</Option>
            <Option value="卵">卵</Option>
            <Option value="果物">果物</Option>
          </Select>
        </div>
      </div>

      <div className="mb-4">
        <p
          style={{
            color: "#563F32",
            padding: "0px 24px 10px 0px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          保存場所
        </p>
        <div style={{ color: "#563F32", width: "250px", margin: "auto" }}>
          <FormControl>
            <RadioGroup
              orientation="horizontal"
              defaultValue="常温"
              onChange={(e) => {
                setState(e.target.value);
                changeDate(category, e.target.value);
              }}
              className="flex justify-center"
            >
              <Radio value="常温" label="常温" />
              <Radio value="冷蔵" label="冷蔵" />
              <Radio value="冷凍" label="冷凍" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="mb-4">
        <p
          style={{
            color: "#563F32",
            paddingBottom: "4px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          消費/賞味期限
        </p>
        <div
          style={{
            color: "#563F32",
            fontWeight: "bold",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileDatePicker"]}>
              <MobileDatePicker
                value={date}
                disablePast={true}
                onChange={(value) => {
                  setDate(value);
                }}
                sx={{ width: "100%", backgroundColor: "white" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>

      <div className="mb-4">
        <CustomButton onClick={submit}>追加</CustomButton>
      </div>
    </div>
  );
}

export default Register;
