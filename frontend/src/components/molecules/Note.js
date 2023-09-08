import { useState, useEffect } from "react";
import FoodApi from "../../api/FoodApi";

export const Note = () => {
  const [limit_food, setLimitfood] = useState("00");

  const daysLeft = (food) => {
    console.log(food.expiration_date);
    return (
      Math.floor(
        (new Date(food.expiration_date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  useEffect(() => {
    const foodapi = new FoodApi();
    foodapi.getFoods().then((res) => {
      console.log(res);
      var foods = res.food_list.map((item) => item.food);
      let count = 0;
      for (let i = 0; i < foods.length; i++) {
        if (daysLeft(foods[i]) <= 3) {
          count++;
        }
      }
      setLimitfood(("00" + count).slice(-2));
    });
  }, []);

  return (
    <div className="w-1/2 text-left m-1">
      <p className="text-sm">3日以内に期限が切れる食品</p>
      <p className="font-bold">
        <span className="text-3xl font-bold">{limit_food}</span> 個
      </p>
    </div>
  );
};
