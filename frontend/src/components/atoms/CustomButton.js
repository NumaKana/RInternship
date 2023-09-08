import { Button } from "@mui/material";

export const CustomButton = (props) => {
  const { children, onClick, size, startIcon, endIcon } = props;
  const handleButtonClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };
  return (
    <Button
      variant="contained"
      onClick={handleButtonClick}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      style={{
        border: "solid 2px #563F32",
        borderRadius: "9999px",
        backgroundColor: "#E8DAA9",
        color: "#563F32",
        padding: "6px 24px",
        fontWeight: "bold",
      }}
    >
      {children}
    </Button>
  );
};
