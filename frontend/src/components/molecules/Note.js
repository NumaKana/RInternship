import { useState, useEffect } from "react";
import FoodApi from "../../api/FoodApi"

export const Note = () => {
    const [foods, setFoods] = useState([])
    const [limit_food, setLimitfood] = useState("0")

    const daysLeft = (food) => {
        return(
            Math.floor(
            (food.expirationDate.getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
    }

    // useEffect(() => {
    //     const foodapi = new FoodApi;
    //     foods = foodapi.getFoods()
    //     console.log(foods)

    //     for(let i=0; i<foods.length; i++){
    //         if(daysLeft(foods[i]) <= 3) {
    //             setLimitfood(limit_food + 1);
    //         }
    //     }

    // }, []);

    return (
    <div className="w-1/2 text-left m-1">
        <p className="text-sm">3日以内に期限が切れる商品</p>
        <p><span className="text-xl font-bold">{limit_food}</span> 個</p>
    </div>
    );
  };
  