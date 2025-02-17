import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";

const ComplianceCalendarDialog = ({ open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [report, setReport] = useState("PA Report Due");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saved:", selectedDate, report);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px", // Apply border radius to the dialog
        },
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        <h5 className="text-lg font-bold">Compliance Calendar</h5>
        <CloseIcon onClick={onClose} className="cursor-pointer" />
      </DialogTitle>
      <DialogContent>
        <style>
          {`
          .MuiInputBase-input.MuiOutlinedInput-input {
            padding: 5px; 
          }
             .dialog-actions-left {
              justify-content: flex-start;
                margin-left:1rem;   
              
            }
                  .custom-cancel-button {
              border: 1px solid #f7f7f7 !important; /* Border color */
            }
        `}
        </style>
        <form className="flex flex-col space-y-4">
          {/* Date Picker */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-500 font-medium">Date</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputBase-root": {
                        padding: "16px", // Increased padding
                        fontSize: "16px", // Larger font size
                        borderRadius: "8px", // Rounded corners
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#E5E5E5 !important", // Maintain border color
                          borderWidth: "2px", // Thicker border
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3f51b5 !important", // Change border color on focus
                        },
                        "&:hover fieldset": {
                          borderColor: "#3f51b5 !important", // Change border color on hover
                        },
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          {/* Report TextField */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-500">Report</label>
            <TextField
              value={report}
              onChange={(e) => setReport(e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  padding: "6px", // Increased padding
                  fontSize: "16px", // Larger font size
                  borderRadius: "8px", // Rounded corners
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E5E5E5 !important", // Maintain border color
                    borderWidth: "2px", // Thicker border
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5 !important", // Change border color on focus
                  },
                  "&:hover fieldset": {
                    borderColor: "#3f51b5 !important", // Change border color on hover
                  },
                },
              }}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions className="dialog-actions-left flex ">
        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: "#007bff", // Primary blue color
            color: "white",
            borderRadius: "10px",
            padding: "8px 25px",
            marginRight: "8px",
            textTransform: "none",

            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          className="custom-cancel-button"
          sx={{
            backgroundColor: "transparent",
            color: "gray",
            borderRadius: "10px",
            padding: "8px 25px",
            textTransform: "none",
            border: "1px solid #f7f7f7 !important",
            borderBlock: " 1px solid #f7f7f7 !important ",

            "&:hover": {
              backgroundColor: "#f0f0f0",
              border: "1px solid ##007bff",
              color: "#007bff",
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplianceCalendarDialog;
