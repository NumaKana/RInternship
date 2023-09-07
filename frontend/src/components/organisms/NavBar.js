import { IconButton } from "@mui/material";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
export const NavBar = (props) => {
  return (
    <>
      <div className="bg-base fixed bottom-0 inset-x-0">
        <div className="flex justify-around text-main pb-3 px-6">
          <div className="flex flex-col items-center">
            <IconButton size="large">
              <FormatListBulletedRoundedIcon fontSize="large" />
            </IconButton>
            <p className="text-sm" style={{ marginTop: "-10px" }}>
              食品一覧
            </p>
          </div>
          <div
            className="flex flex-col items-center z-10"
            style={{ marginTop: "-10px" }}
          >
            <IconButton size="large" style={{ transform: "scale(1.5)" }}>
              <HomeRoundedIcon fontSize="large" />
            </IconButton>
            <p className="text-sm" style={{ marginTop: "-6px" }}>
              ホーム
            </p>
          </div>
          <div className="flex flex-col items-center">
            <IconButton size="large">
              <AddRoundedIcon fontSize="large" />
            </IconButton>
            <p className="text-sm" style={{ marginTop: "-10px" }}>
              追加
            </p>
          </div>
        </div>
        <div
          className="inline-block w-24 h-24 mx-auto bg-base rounded-full absolute top-5 z-0"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
};
