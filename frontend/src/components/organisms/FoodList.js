import { FoodItem } from "../molecules/FoodItem";

export const FoodList = (props) => {
  const { foods = [] } = props;
  return (
    <div>
      {foods.map((food) => {
        return (
          <div className="p-1">
            <FoodItem key={food.food_id} food={food} />
          </div>
        );
      })}
    </div>
  );
};
