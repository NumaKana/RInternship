export const Status = (props) => {
    var now_exp = props.exp
    console.log("now_exp>>"+now_exp)
    var next_exp = 50 * ((1.1 ^ (props.level + 1) - 1)/ (1.1 - 1))
    console.log("next_exp>>"+next_exp)
    if(next_exp == 0){
        var width = 0
    }else{
        var width = Math.floor(160 * now_exp / next_exp)
    }
    console.log("width>>"+width)
    return (
    <div className="w-1/2 left-1/2 text-left p-1">
        <div className="bg-white rounded top-2 right-2 p-2">
            <p>Lv. <span className="text-xl font-bold">{props.level}</span></p>
            <div className="h-2 relative bg-green-300 z-10" style={{width:`${width}px`}} ></div>
            <p className="text-xs">これまで食べた笹の数：<span>{props.given_food}</span></p>
        </div>
    </div>
  );
};
