export const Status = (props) => {
  var now_exp = props.exp;
  console.log("level>>" + props.level);
  console.log("now_exp>>" + now_exp);
  var next_exp = 50 * ((1.1 ** (props.level + 1.0) - 1.0) / (1.1 - 1.0));
  var before_exp = 50 * ((1.1 ** (props.level) - 1.0) / (1.1 - 1.0));
  console.log("next_exp>>" + next_exp);
  console.log("before_exp>>" + before_exp);
  if (next_exp == 0) {
    var width = 0;
  } else {
    var width = Math.floor((160 * (now_exp - before_exp)) / (next_exp - before_exp));
  }
  console.log("width>>" + width);
  return (
    <div className="w-1/2 left-1/2 text-left p-1">
      <div className="bg-white rounded-xl top-2 right-2 p-2">
        <p className="font-bold pb-2">
          Lv. <span className="text-xl font-bold">{props.level}</span>
        </p>
        <div
          className="h-2 relative bg-green-400 z-10 rounded-full"
          style={{ width: `${width}px` }}
        ></div>
        <div
          className="h-2 relative bg-gray-200 z-0 rounded-full"
          style={{ top: "-8px", width: "160px" }}
        ></div>
        <p className="text-xs text-gray-600" style={{ marginTop: "-4px" }}>
          これまで食べた笹の数：<span>{props.given_food}</span>
        </p>
      </div>
    </div>
  );
};
