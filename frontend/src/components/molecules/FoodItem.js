import { useState } from "react";

import { CustomIconButton } from "../atoms/CustomIconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomButton } from "../atoms/CustomButton";

export const FoodItem = () => {
  const [open, setOpen] = useState(true);

  const handleItemClick = () => {
    setOpen(!open);
  };

  return (
    <div
      className="p-3 rounded-xl select-none"
      style={{ border: "solid 1px" }}
      onClick={handleItemClick}
    >
      <div className="flex justify-between items-center">
        <p>トマト</p>
        <p>
          あと
          <span className="font-bold" style={{ color: "#aa0000" }}>
            <span className="text-xl">2</span>日
          </span>
        </p>
      </div>
      <div className={`mt-3 ${!open && "hidden"}`}>
        <table className="mb-3 text-left">
          <DetailTableRow label="消費 / 賞味期限" value="2023/12/24" />
          <DetailTableRow label="カテゴリ" value="野菜" />
          <DetailTableRow label="保存方法" value="冷蔵" />
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
