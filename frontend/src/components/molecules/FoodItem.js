import { useState } from "react";

import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomIconButton } from "../atoms/CustomIconButton";
import { CustomButton } from "../atoms/CustomButton";

import { CATEGORIES, STORAGES } from "../../constants/food";
import { exampleFood } from "../../examples/food";

export const FoodItem = (props) => {
  const { food = exampleFood } = props;
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(!open);
  };

  const daysLeft =
    Math.floor(
      (new Date(food.expiration_date).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

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
          <span className="font-bold" style={{ color: "#aa0000" }}>
            <span className="text-xl">{daysLeft}</span>日
          </span>
        </p>
      </div>
      <div className={`mt-3 ${!open && "hidden"}`}>
        <table className="mb-3 text-left">
          <tbody>
            <DetailTableRow
              label="消費 / 賞味期限"
              value={food.expiration_date}
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
              <CustomIconButton onClick={() => {}}>
                <DeleteIcon />
              </CustomIconButton>
            </span>
            <span>
              <CustomIconButton onClick={() => {}}>
                <EditIcon />
              </CustomIconButton>
            </span>
          </div>
          <div>
            <CustomButton onClick={() => {}}>完食</CustomButton>
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
