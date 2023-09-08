export const Status = (props) => {
  var now_exp = props.exp;
  var next_exp = 50 * ((1.1 ^ (props.level + 1 - 1)) / (1.1 - 1));
  var width = 160 * (now_exp / next_exp);
  return (
    <div className="w-1/2 left-1/2 text-left p-1 ">
      <div className="bg-white rounded-xl top-2 right-2 p-3 shadow-md">
        <p className="pb-1 font-bold text-lg">
          Lv. <span className="text-2xl font-bold">{props.level}</span>
        </p>
        <div
          className="h-2 relative bg-green-400 z-10 rounded-full"
          style={{ width: `${width}px` }}
        ></div>
        <p className="text-xs pt-1 text-gray-600">
          これまで食べた笹の数：
          <span className="font-bold" style={{ fontSize: "1.4em" }}>
            {props.given_food}
          </span>
        </p>
      </div>
    </div>
  );
};
