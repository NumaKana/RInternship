import { FoodItem } from "../molecules/FoodItem";
import { CustomButton } from "../atoms/CustomButton";

const Foods = () => {
  return (
    <div>
      FoodsPage
      <FoodItem />
      <CustomButton>追加</CustomButton>
    </div>
  );
};
export default Foods;
