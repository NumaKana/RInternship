export const Status = (props) => {
    return (
    <div className="w-1/2 left-1/2 text-left">
        <div className="bg-white rounded top-2 right-2">
            <p>Lv. <span>{props.level}</span></p>
            <p>これまで食べた笹の数：<span>{props.given_food}</span></p>
        </div>
        <div className="w-1/2 h-3  left-1/4 bg-green z-10"></div>

    </div>
    );
  };
  