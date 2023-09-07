import { useState } from "react";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { CustomButton } from "../atoms/CustomButton";
import { SwipeableDrawer } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import FoodApi from "../../api/FoodApi"

function Edit(props) {
  const [id, setID] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [state, setState] = useState();
  const [date, setDate] = useState();
  const [open, setOpen] = useState();
  const [error, setError] = useState(false);

  const foodApi = new FoodApi();
  const navigate = useNavigate();

  React.useEffect(() => {
    setOpen(props.open);
    // console.log(props.food);
    if (props.open && (props.food !== null)) {
      const food = props.food;
      setID(food.id);
      setName(food.food_name);
      setCategory(food.category);
      setState(food.storage_status);
      setDate(dayjs(food.expiration_date));
    }
  }, [props.open, props.food]);

  const submit = () => {
    if (name === "") {
      setError(true);
      return;
    }
    var d = date.format("YYYY-MM-DD");
    var data = { "food_edit": { "food_id": id, "food_name": name, "category": category, "expiration_date": d, "storage_status": state } };
    foodApi
      .editFood(id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("failed to edit");
      });
    console.log(data);
    setOpen(false);
    navigate(ROUTES.FOODS);
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    props.openEdit(newOpen);
  }

  return (
    <div>
      {/* <button onClick={(e) => { setOpen(true); }}>OPEN</button> */}
      <SwipeableDrawer
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        anchor="bottom"
        style={{ zIndex: 10 }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ padding: "10px" }}>
            <p style={{ color: "#563F32", padding: "0px 24px", fontWeight: "bold" }}><big>食品編集</big></p>
          </div>
          <div style={{ padding: "10px" }}>
            <p style={{ color: "#563F32", padding: "0px 24px", fontWeight: "bold" }}>食品名</p>
            <TextField required defaultValue={name} value={name} id="filled-basic" variant="standard"
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value === "") {
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
              <FormControl sx={{ minWidth: "100px" }} variant="standard">
                <Select labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  defaultValue="vegetable"
                  onChange={(e) => { console.log(e); setCategory(e.target.value); changeDate(e.target.value, state); }}
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

          <div style={{ padding: "10px" }}>
            <p style={{ color: "#563F32", padding: "0px 24px", fontWeight: "bold" }}>保存場所</p>
            <div style={{ color: "#563F32", width: "250px", margin: "auto" }}>
              <FormControl>
                <RadioGroup orientation="horizontal" defaultValue={state} onChange={(e) => { setState(e.target.value); changeDate(category, e.target.value); }}>
                  <Radio value="room" label="常温" variant="soft" color="warning" />
                  <Radio value="fridge" label="冷蔵" variant="soft" color="warning" />
                  <Radio value="freezer" label="冷凍" variant="soft" color="warning" />
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
      </SwipeableDrawer>
    </div>
  );
}

export default Edit;
