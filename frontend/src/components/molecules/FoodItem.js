import { useState } from "react";

import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomIconButton } from "../atoms/CustomIconButton";
import { CustomButton } from "../atoms/CustomButton";

import { CATEGORIES, STORAGES } from "../../constants/food";
import FoodApi from "../../api/FoodApi";

export const FoodItem = (props) => {
  const { food, onDelete, onConsume, openEdit, changeOpen } = props;
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(!open);
  };

  const handleDeleteButtonClick = () => {
    if (!window.confirm("食品を削除しますか？")) {
      return;
    }
    const foodApi = new FoodApi();
    foodApi
      .deleteFood(food.food_id)
      .then((res) => {
        console.log(res);
        onDelete();
      })
      .catch((err) => {
        console.log(err);
        alert("削除に失敗しました");
      });
  };

  const handleEditButtonClick = () => {
    openEdit(true, food);
  };

  const handleConsumeButtonClick = () => {
    const foodApi = new FoodApi();
    foodApi
      .consumeFood(food.food_id)
      .then((res) => {
        console.log(res);
        onConsume();
        changeOpen(true);
      })
      .catch((err) => {
        console.log(err);
        alert("処理に失敗しました");
      });
  };

  const daysLeft =
    Math.floor(
      (new Date(food.expiration_date).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  let daysLeftColor = "";
  if (daysLeft <= 3) {
    daysLeftColor = "#aa0000";
  } else if (daysLeft <= 7) {
    daysLeftColor = "#ff9900";
  } else {
    daysLeftColor = "#00aa00";
  }

  return (
    <div
      className="p-3 rounded-xl select-none bg-white cursor-pointer"
      style={{ border: "solid 1px #D1D5DB" }}
      onClick={handleItemClick}
    >
      <div className="flex justify-between items-center">
        <p>{food.food_name}</p>
        <p>
          あと
          <span className="font-bold" style={{ color: daysLeftColor }}>
            <span className="text-xl">{daysLeft}</span>日
          </span>
        </p>
      </div>
      <div className={`mt-3 ${!open && "hidden"}`}>
        <table className="mb-3 text-left">
          <tbody>
            <DetailTableRow
              label="消費 / 賞味期限"
              value={food.expiration_date.replaceAll("-", "/")}
            />
            <DetailTableRow
              label="カテゴリ"
              value={
                <Chip
                  size="small"
                  label={
                    CATEGORIES[food.category]
                      ? CATEGORIES[food.category].name
                      : CATEGORIES.other.name
                  }
                  style={{
                    backgroundColor: CATEGORIES[food.category]
                      ? CATEGORIES[food.category].color
                      : CATEGORIES.other.color,
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              }
            />
            <DetailTableRow
              label="保存方法"
              value={
                <Chip
                  size="small"
                  label={
                    STORAGES[food.storage_status]
                      ? STORAGES[food.storage_status].name
                      : STORAGES.other.name
                  }
                  style={{
                    backgroundColor: STORAGES[food.storage_status]
                      ? STORAGES[food.storage_status].color
                      : STORAGES.other.color,
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              }
            />
          </tbody>
        </table>
        <div className="flex justify-between">
          <div>
            <span className="mr-3">
              <CustomIconButton onClick={handleDeleteButtonClick}>
                <DeleteIcon />
              </CustomIconButton>
            </span>
            <span>
              <CustomIconButton onClick={handleEditButtonClick}>
                <EditIcon />
              </CustomIconButton>
            </span>
          </div>
          <div>
            <CustomButton onClick={handleConsumeButtonClick}>完食</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailTableRow = (props) => {
  return (
    <tr className="text-sm">
      <td className="pr-6 pb-1 text-main">{props.label}</td>
      <td className="pb-1 text-gray-500">{props.value}</td>
    </tr>
  );
};
