import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileRejectionItems from "./FileRejectionsItems";
import AcceptedFilesItems from "./AcceptedFilesItems";
import * as S from "./styles";

const FileUploader = ({
  multiFile,
  onChange,
  content,
  containerSx,
  allowedExtensions,
  maxFiles: _maxFiles,
  customValidator,
  onError,
  showError
}) => {
  const [files, setFiles] = useState([]);
  const maxFiles = multiFile ? _maxFiles : 1;

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = [
        ...acceptedFiles,
        ...files.map((file) => {
          const newFile = new File([file], file.name);
          Object.defineProperty(newFile, "status", {
            value: "idle",
            writable: true
          });
          return newFile;
        })
      ];
      setFiles(newFiles);

      if (onChange && typeof onChange === "function") {
        onChange(newFiles, setFiles);
      }
    },
    [onChange, files]
  );

  const validator = useCallback(
    (file) => {
      if (files.length >= maxFiles) {
        return {
          code: "too-many-files",
          message: "Too many files"
        };
      }

      if (files.find((f) => f.size === file.size && f.name === file.name)) {
        return {
          code: "file-already-selected",
          message: "The file is already selected"
        };
      }

      if (customValidator && typeof customValidator === "function") {
        return customValidator(file);
      }

      return null;
    },
    [files, maxFiles, customValidator]
  );

  const handleDeleteItem = (file) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);

    if (onChange && typeof onChange === "function") {
      onChange(newFiles, setFiles);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: allowedExtensions,
    maxFiles: maxFiles,
    validator
  });

  return (
    <S.Container {...getRootProps({ sx: containerSx })}>
      <input
        {...getInputProps({
          multiple: multiFile
        })}
      />
      {content && typeof content === "function" ? (
        content({ isDragActive, multiFile, maxFiles, files })
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            flex: "1",
            maxWidth: "fit-content",
            margin: "0 3rem"
          }}
        >
          <CloudUploadIcon
            className="cloud-upload-icon"
            sx={{
              fontSize: isDragActive ? "54px" : "50px",
              color: isDragActive ? "primary.main" : "primary.light",
              transition: "font-size 0.25s ease, color 0.25s ease"
            }}
          />
          {isDragActive ? (
            <Typography element="p">Drop the files here</Typography>
          ) : (
            <>
              {files.length === 0 && (
                <Typography element="p">
                  {`Drag 'n' drop or browse to choose file${
                    multiFile ? "s" : ""
                  }`}
                </Typography>
              )}

              <Typography variant="caption">
                {maxFiles - files.length} files remaining
              </Typography>
              {allowedExtensions && files.length === 0 && (
                <Typography variant="caption">
                  Extensions accepted :{" "}
                  {Object.values(allowedExtensions)
                    .flat()
                    .reduce((acc, curr) => [acc, ", ", curr])}
                </Typography>
              )}
            </>
          )}
        </Stack>
      )}

      <Box
        sx={{
          alignSelf: "start",
          flex: files.length === 0 ? "0" : "auto",
          transition: "all .5s ease",
          padding: files.length === 0 ? "0" : "0 3rem",
          transform: files.length === 0 ? "scale(0)" : "scale(1)"
        }}
      >
        {Boolean(fileRejections.length) && (
          <FileRejectionItems fileRejections={fileRejections} />
        )}
        {Boolean(files.length) && (
          <AcceptedFilesItems
            acceptedFiles={files}
            onDelete={handleDeleteItem}
          />
        )}
      </Box>

      {/* </Box> */}
    </S.Container>
  );
};

FileUploader.propTypes = {
  multiFile: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  containerSx: PropTypes.shape(),
  allowedExtensions: PropTypes.shape(),
  maxFiles: PropTypes.number,
  customValidator: PropTypes.func
};

FileUploader.defaultProps = {
  multiFile: false,
  content: null,
  containerSx: {},
  allowedExtensions: undefined,
  maxFiles: undefined,
  customValidator: null
};

export default FileUploader;
