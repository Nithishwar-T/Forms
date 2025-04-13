








import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Typography,
  Checkbox,
  Radio,
  Slider,
  Rating,
  Menu,
  Button,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const questionTypes = [
  "Short answer",
  "Paragraph",
  "Multiple choice",
  "Checkboxes",
  "Dropdown",
  "File upload",
  "Linear scale",
  "Rating",
  "Date",
  "Time",
];

const QuestionBlock = () => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("Short answer");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState(["Option 1"]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ratingValue, setRatingValue] = useState(3);
  const [sliderValue, setSliderValue] = useState(3);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const renderAnswerInput = () => {
    switch (questionType) {
      case "Short answer":
        return <TextField fullWidth placeholder="Short answer text" variant="standard" />;
      case "Paragraph":
        return <TextField fullWidth placeholder="Long answer text" multiline rows={3} />;
      case "Multiple choice":
        return (
          <Box>
            {options.map((opt, idx) => (
              <Box key={idx} display="flex" alignItems="center" mb={1}>
                <Radio disabled />
                <TextField
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  size="small"
                  sx={{ ml: 1, flex: 1 }}
                />
              </Box>
            ))}
            <Typography onClick={addOption} sx={{ cursor: "pointer", color: "blue" }}>
              Add option or <strong>add "Other"</strong>
            </Typography>
          </Box>
        );
      case "Checkboxes":
        return (
          <Box>
            {options.map((opt, idx) => (
              <Box key={idx} display="flex" alignItems="center" mb={1}>
                <Checkbox disabled />
                <TextField
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  size="small"
                  sx={{ ml: 1, flex: 1 }}
                />
              </Box>
            ))}
            <Typography onClick={addOption} sx={{ cursor: "pointer", color: "blue" }}>
              Add checkbox
            </Typography>
          </Box>
        );
      case "Dropdown":
        return (
          <Select fullWidth defaultValue="">
            {options.map((opt, idx) => (
              <MenuItem key={idx} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        );
      case "File upload":
        return (
          <Box>
            <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
              Upload File
              <input type="file" hidden />
            </Button>
          </Box>
        );
      case "Linear scale":
        return (
          <Box>
            <Typography>Linear scale</Typography>
            <Slider
              value={sliderValue}
              onChange={(e, newVal) => setSliderValue(newVal)}
              min={1}
              max={5}
              marks
              step={1}
            />
          </Box>
        );
      case "Rating":
        return (
          <Box>
            <Typography>Rating</Typography>
            <Rating
              name="rating"
              value={ratingValue}
              onChange={(e, newVal) => setRatingValue(newVal)}
            />
          </Box>
        );
      case "Date":
        return <TextField type="date" fullWidth />;
      case "Time":
        return <TextField type="time" fullWidth />;
      default:
        return <Typography variant="body2">Input not available</Typography>;
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        bgcolor: "#fff",
        borderRadius: 2,
        p: 3,
        boxShadow: 2,
        mt: 4,
      }}
    >
      {/* Top Row: Question + Image + Type */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          fullWidth
        />
        <IconButton>
          <ImageOutlinedIcon />
        </IconButton>
        <Select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {questionTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Dynamic Input Based on Type */}
      <Box mt={2}>{renderAnswerInput()}</Box>

      {/* Bottom Row: Required + Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        borderTop="1px solid #ccc"
        pt={2}
      >
       
        <Box>
          <IconButton title="Duplicate">
            <ContentCopyIcon />
          </IconButton>
          <IconButton title="Delete">
            <DeleteOutlineIcon />
          </IconButton>
          <FormControlLabel
         
          control={
            <Switch
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
            />
          }
           label="Required"
        />
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Move to section</MenuItem>
            <MenuItem onClick={handleMenuClose}>Add description</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionBlock;





