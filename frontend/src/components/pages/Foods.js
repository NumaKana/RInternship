import { FoodList } from "../organisms/FoodList";
import { exampleFood } from "../../examples/food";
import { useEffect, useState } from "react";

import FoodApi from "../../api/FoodApi";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const foodApi = new FoodApi();
    foodApi.getFoods().then((res) => {
      console.log(res);
      const food_list = res.food_list;
      setFoods(food_list);
    });
  }, []);
  return (
    <div className="min-h-screen">
      <div className="pt-3">
        <FoodList
          foods={[...Array(10)].map(() => {
            return exampleFood;
          })}
        />
      </div>
    </div>
  );
};
export default Foods;
