import React from "react";
import { TextField, Box } from "@mui/material";

const FormHeader = ({ title, setTitle, desc, setDesc }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
        inputProps={{ style: { fontSize: 28, fontWeight: 600 } }}
      />
      <TextField
        fullWidth
        variant="standard"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Form Description"
        inputProps={{ style: { fontSize: 16, color: "#666" } }}
        sx={{ mt: 1 }}
      />
    </Box>
  );
};

export default FormHeader;
