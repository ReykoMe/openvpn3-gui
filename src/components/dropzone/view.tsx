import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

export type DropzoneProps = {
  onClickCancel: VoidFunction;
  handleSubmit: (formData: { configName: string; file: File }) => void;
};

export const Dropzone: React.FC<DropzoneProps> = (props) => {
  const { onClickCancel, handleSubmit } = props;
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const showInputError = Boolean(formErrors.length);

  function handleFileDrop(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    if (files.length > 1) return console.error("Only 1 file allowed");
    const [file] = files;
    setConfigFile(file);
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickSubmit = () => {
    const validateForm = (formData: {
      configName: string;
      file: File | null;
    }) => {
      const { configName, file } = formData;
      const errors: string[] = [];
      if (!configName.length)
        errors.push("You should provide name of configuration file to save");
      if (!file) errors.push("No file to import selected");
      return errors.length ? errors : null;
    };

    const errors = validateForm({
      configName: inputValue,
      file: configFile,
    });
    if (!errors && configFile) {
      return handleSubmit({
        configName: inputValue,
        file: configFile,
      });
    }
    if (errors) {
      setFormErrors(errors);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        name="configName"
        value={inputValue}
        onChange={handleInputChange}
        size="small"
        label="Enter config file name"
        required
      />
      <Box
        sx={{
          position: "relative",
          bgcolor: "grey.200",
          height: (theme) => theme.spacing(20),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
          border: (theme) => `1px dashed ${theme.palette.grey[400]}`,
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      >
        <Typography variant="body2" color="grey.500" fontWeight="500">
          Drop here or click to import your .ovpn config and connect
        </Typography>
        <input
          type="file"
          onChange={handleFileDrop}
          accept=".ovpn"
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            left: "0",
            position: "absolute",
            background: "red",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </Box>
      {showInputError && (
        <Box>
          {formErrors.map((err) => (
            <FormHelperText error>{err}</FormHelperText>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button color="error" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClickSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
