import { FoodList } from "../organisms/FoodList";
import { exampleFood } from "../../examples/food";

const Foods = () => {
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
