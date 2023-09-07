export const Note = (props) => {

    return (
    <div className="w-1/2 text-left">
        <p className="text-sm">3日以内に期限が切れる商品</p>
        <p><span>{props.item}</span>個</p>
    </div>
    );
  };
  