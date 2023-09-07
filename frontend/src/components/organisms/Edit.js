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
              <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 1000 }) }}
                value={category}
                onChange={(e) => { setCategory(e.target.innerText); }}
              >
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
                <RadioGroup orientation="horizontal" value={state} onChange={(e) => { setState(e.target.value); }}>
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
