import React from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = ({ questions, setQuestions }) => {
  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "Untitled Question",
        options: ["Option 1"],
        required: false,
      },
    ]);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "120px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#fff",
        padding: 1,
        borderRadius: 2,
        boxShadow: 1,
        zIndex: 999,
      }}
    >
      <IconButton color="primary" onClick={addNewQuestion}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
