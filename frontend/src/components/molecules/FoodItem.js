export const FoodItem = () => {
  return (
    <div className="p-2" style={{ border: "solid 1px" }}>
      <div className="flex justify-between">
        <p>トマト</p>
        <p>あと2日</p>
      </div>
      <table className="text-left">
        <tbody>
          <tr>
            <td className="pr-6">消費 / 賞味期限</td>
            <td>2023/12/24</td>
          </tr>
          <tr>
            <td className="pr-6">カテゴリ</td>
            <td>野菜</td>
          </tr>
          <tr>
            <td className="pr-6">保存方法</td>
            <td>冷蔵</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between">
        <div>
          <button>trash</button>
          <button>edit</button>
        </div>
        <button>complete</button>
      </div>
    </div>
  );
};
