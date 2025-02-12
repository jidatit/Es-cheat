import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';

const ComplianceCalendarDialog = ({ open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [report, setReport] = useState('PA Report Due');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Saved:', selectedDate, report);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <h5 className="text-lg font-semibold">Compliance Calendar</h5>
        <CloseIcon onClick={onClose} className="cursor-pointer" />
      </DialogTitle>
      <DialogContent>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Date</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Report</label>
            <TextField
              value={report}
              onChange={(e) => setReport(e.target.value)}
              fullWidth
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions className="flex justify-between px-4 py-2">
        <Button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplianceCalendarDialog;