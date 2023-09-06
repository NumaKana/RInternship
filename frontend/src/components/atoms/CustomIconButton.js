import { IconButton } from "@mui/material";

export const CustomIconButton = (props) => {
  const { children, onClick, size } = props;
  const handleButtonClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };
  return (
    <IconButton
      onClick={handleButtonClick}
      size={size}
      aria-label="delete"
      style={{
        border: "solid 2px #563F32",
        borderRadius: "9999px",
        backgroundColor: "#E8DAA9",
        color: "#563F32",
        fontWeight: "bold",
      }}
    >
      {children}
    </IconButton>
  );
};
