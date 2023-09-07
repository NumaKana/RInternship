import { useState } from "react";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Select from "@mui/joy/Select";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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
  const [category, setCategory] = useState("vegetable");
  const [state, setState] = useState("room");
  const [date, setDate] = useState(dayjs().add(14, 'day'));
  const [error, setError] = useState(false);

  const foodApi = new FoodApi();
  const navigate = useNavigate();

  const changeDate = (cat, val) => {
    let days = 0;
    switch (cat) {
      case "vegetable":
        days += 14;
        break;
      case "meat":
        days += 1;
        break;
      case "fish":
        days += 1;
        break;
      case "milk":
        days += 1;
        break;
      case "egg":
        days += 7;
        break;
      case "fruit":
        days += 14;
        break;
      default:
        break;
    }
    switch (val) {
      case "fridge":
        days += 7;
        break;
      case "freezer":
        days += 14;
        break;
      default:
        break;
    }
    setDate(dayjs().add(days, "day"));
  };

  const submit = () => {
    if (name === "") {
      setError(true);
      return;
    }
    var d = date.format("YYYY-MM-DD");
    var data = { "food_add": { "food_name": name, "category": category, "expiration_date": d, "storage_status": state } };
    foodApi
      .registerFood(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("failed to register");
      });
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
            if (e.target.value === "") {
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
          <FormControl sx={{ minWidth: "100px" }} variant="standard">
            <Select labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue="vegetable"
              onChange={(e) => { console.log(e); setCategory(e.target.value); changeDate(e.target.value, state); }}
              sx={{ width: "100%" }}
            >
              <MenuItem value="vegetable">野菜</MenuItem>
              <MenuItem value="meat">肉</MenuItem>
              <MenuItem value="fish">魚</MenuItem>
              <MenuItem value="milk">牛乳</MenuItem>
              <MenuItem value="egg">卵</MenuItem>
              <MenuItem value="fruit">果物</MenuItem>
            </Select>
          </FormControl>
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
            <RadioGroup orientation="horizontal" defaultValue="room" onChange={(e) => { setState(e.target.value); changeDate(category, e.target.value); }} className="flex justify-center">
              <Radio value="room" label="常温" variant="soft" color="warning" />
              <Radio value="fridge" label="冷蔵" variant="soft" color="warning" />
              <Radio value="freezer" label="冷凍" variant="soft" color="warning" />
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
