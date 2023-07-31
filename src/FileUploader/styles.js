import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";

const Container = styled(Box)(({ theme, isDragActive }) => {
  const { palette } = theme;

  return {
    width: "100%",
    height: "100%",
    minHeight: 150,
    minWidth: 226,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "1rem",
    overflow: "auto",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='${(isDragActive
      ? palette.primary.main
      : palette.primary.light
    ).replace(
      "#",
      "%23"
    )}' stroke-width='5' stroke-dasharray='10' stroke-dashoffset='7' stroke-linecap='square'/%3e%3c/svg%3e")`,
    borderRadius: "5px",
    position: "relative",
    backgroundColor: alpha(palette.primary.main, 0),
    transition: "background-color .25s ease",
    ...(isDragActive && {
      backgroundCcolor: alpha(palette.primary.main, 0.05)
    }),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: alpha(palette.primary.main, 0.05),
      ".cloud-upload-icon": {
        color: palette.primary.main
      }
    }
  };
});

export { Container };
