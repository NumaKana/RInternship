import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { FoodItem } from "../molecules/FoodItem";
import FoodApi from "../../api/FoodApi";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
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
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Foods;
