import { useState, useEffect } from "react";
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
import FoodApi from "../../api/FoodApi"

function Edit(props) {
  const [name, setName] = useState();
  const [category, setCategory] = useState("vegetable");
  const [state, setState] = useState("room");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const foodApi = new FoodApi();



  useEffect(
    () => {
      const setProp = () => {
        setName(props.food.food_name);
        setCategory(props.food.category);
        setState(props.food.storage_status);
        setDate(dayjs(props.food.expiration_date));
        setError(false);
      }

      setOpen(props.open);
      if (props.open) {
        setProp();
      }
    },
    [props.open]
  );

  const submit = () => {
    if (name === "") {
      setError(true);
      return;
    }
    const d = date.format("YYYY-MM-DD");
    const data = { "food_edit": { "food_id": props.food.food_id, "food_name": name, "category": category, "expiration_date": d, "storage_status": state } };
    foodApi
      .editFood(props.food.food_id, data)
      .then((res) => {
        console.log(res);
        props.onEdit();
        props.openEdit(false);
      })
      .catch((err) => {
        console.log(err);
        alert("failed to edit");
      });
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
            <TextField required value={name} id="filled-basic" variant="standard"
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
                  // defaultValue={category}
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); }}
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
                <RadioGroup orientation="horizontal"
                  // defaultValue={state}
                  value={state}
                  onChange={(e) => { setState(e.target.value); }}
                >
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
            <CustomButton onClick={submit}>変更</CustomButton>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default Edit;
