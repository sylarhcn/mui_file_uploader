import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CircularProgress,
  Tooltip
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const AcceptedFilesItems = ({ acceptedFiles, onDelete }) => {
  return (
    <List
      dense
      sx={{
        maxHeight: "250px",
        overflow: "auto"
      }}
    >
      {acceptedFiles.map((file) => (
        <ListItem
          key={file.name}
          divider
          secondaryAction={
            file.status === "uploading" ? (
              <CircularProgress size="1em" />
            ) : (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(file);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <ListItemIcon>
            {file.status === "uploaded" ? (
              <CheckCircleOutlineRoundedIcon color="success" fontSize="small" />
            ) : (
              <UploadFileIcon color="default" fontSize="small" />
            )}
          </ListItemIcon>
          <Tooltip title={file.name.length > 20 ? file.name : ""}>
            <ListItemText
              primary={file.name}
              primaryTypographyProps={{
                noWrap: true,
                style: { width: "20ch" }
              }}
            />
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};

export default AcceptedFilesItems;
