import { FoodItem } from "../molecules/FoodItem";

export const FoodList = (props) => {
  const { foods = [] } = props;
  return (
    <div>
      {foods.map((food, index) => {
        return (
          <div className="p-1">
            <FoodItem key={index} food={food} />
          </div>
        );
      })}
    </div>
  );
};
