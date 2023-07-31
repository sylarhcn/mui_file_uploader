import { useCallback, useState } from "react";
import FileUploader from "./FileUploader";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Typography } from "@mui/material";
import theme from "./theme";

export default function App() {
  const [state, setState] = useState([]);

  const handleChange = useCallback((files, setFiles) => {
    setFiles((prev) =>
      prev.map((file) => {
        file.status = "uploading";
        return file;
      })
    );

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((file) => {
          const newFile = new File([file], file.name);
          newFile.status = "uploaded";
          return newFile;
        })
      );
    }, 5000);

    setTimeout(() => {
      setFiles([]);
    }, 8000);

    setState(files);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 5,
          my: 5
        }}
      >
        <Box sx={{ mt: 2, width: 600 }}>
          <Typography variant="h6">Controlled</Typography>
          <FileUploader multiFile onChange={handleChange} maxFiles={2} />
          <p>File list:</p>
          <ul>
            {state.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </Box>
        <Box sx={{ mt: 2, width: 600 }}>
          <Typography variant="h6">Custom content</Typography>
          <FileUploader
            content={({ isDragActive }) =>
              isDragActive ? <p>Drop it like it's hot !</p> : <p>Drag on it</p>
            }
          />
        </Box>
        <Box sx={{ mt: 2, width: 600 }}>
          <Typography variant="h6">Mime type/extension validation</Typography>
          <FileUploader
            allowedExtensions={{
              "image/*": [".png", ".jpg"],
              "audio/mpeg": [".mp4"]
            }}
          />
        </Box>
        <Box sx={{ mt: 2, width: 600 }}>
          <Typography variant="h6">Custom style</Typography>
          <FileUploader
            containerSx={{
              color: "warning.main",
              "& .MuiSvgIcon-root": {
                color: "warning.main"
              }
            }}
          />
        </Box>
        <Box sx={{ mt: 2, width: 600 }}>
          <Typography variant="h6">Custom validator</Typography>
          <FileUploader
            multiFile
            onChange={handleChange}
            maxFiles={2}
            customValidator={(file) => {
              if (file.name.length > 3) {
                return {
                  code: "name-too-long",
                  message: "Name too long"
                };
              }

              return null;
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
