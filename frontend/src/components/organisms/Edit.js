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

function Edit(props) {
  const [id, setID] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [category, setCategory] = useState(props.category);
  const [state, setState] = useState(props.state);
  const [date, setDate] = useState(props.date);
  const [open, setOpen] = useState(false);

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
    }
    switch (val) {
      case "fridge":
        days += 7;
        break;
      case "freezer":
        days += 14;
        break;
    }
    setDate(dayjs().add(days, "day"));
  }

  const submit = () => {

  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
            <TextField defaultValue={name} id="filled-basic" label="食品名" variant="standard" onChange={(e) => { setName(e.target.value) }} />
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
      </SwipeableDrawer>
    </div>
  );
}

export default Edit;
