export const Status = (props) => {
    return (
    <div className="w-1/2 left-1/2 text-left p-1">
        <div className="bg-white rounded top-2 right-2 p-2">
            <p>Lv. <span className="text-xl font-bold">{props.level}</span></p>
            <div className="w-1/2 h-2 relative bg-green-300 z-10"></div>
            <p className="text-xs">これまで食べた笹の数：<span>{props.given_food}</span></p>
        </div>

    </div>
    );
  };
  