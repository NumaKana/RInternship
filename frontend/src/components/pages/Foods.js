import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { FoodItem } from "../molecules/FoodItem";
import FoodApi from "../../api/FoodApi";
import Popup from "../organisms/Popup";
import img from "../../img/sasa.png"

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const changeOpen = (newOpen) => {
    setOpen(newOpen);
  }

  useEffect(() => {
    setLoading(true);
    fetchFoods().then(() => {
      setLoading(false);
    });
  }, []);

  const fetchFoods = () => {
    const foodApi = new FoodApi();
    return foodApi.getFoods().then((res) => {
      const food_list = res.food_list.map((item) => item.food);
      setFoods(food_list);
    });
  };

  return (
    <div className="min-h-screen">
      <Popup open={open} changeOpen={changeOpen} message1="完食！" message2="笹をゲットしました！はらぺこパンダに笹をプレゼントしましょう!" img={img}></Popup>
      <div className="pt-3">
        {loading && <CircularProgress color="inherit" />}
        {foods
          .sort(
            (x, y) =>
              new Date(x.expiration_date).getTime() -
              new Date(y.expiration_date).getTime()
          )
          .map((food) => {
            return (
              <div className="p-1">
                <FoodItem
                  key={food.food_id}
                  food={food}
                  onDelete={fetchFoods}
                  onConsume={fetchFoods}
                  changeOpen={changeOpen}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Foods;
