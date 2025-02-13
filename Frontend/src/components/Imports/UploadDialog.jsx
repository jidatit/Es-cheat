import React, { useState, useRef } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import cloudIcon from '../../assets/images/cloud-upload-icon.svg'; 
import { Button } from '@mui/material';

const UploadDialog = ({ isOpen, onClose, onSave }) => {
  const [holder, setHolder] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHoldersLoading, setIsHoldersLoading] = useState(false); // Define isHoldersLoading
  const [holders, setHolders] = useState([]); // Define holders
  const fileInputRef = useRef(null);



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileClear = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="dialog-container p-4 bg-white rounded-lg shadow-lg max-w-lg w-full">
      <div className=" flex justify-between ">
        <div>
          <h5 className="text-xl text-left font-semibold">Upload a CSV File</h5>
        </div>
        <img
          onClick={onClose}
          className="cursor-pointer"
          src={closeIcon}
        //   src="/assets/images/close-icon.svg"
          alt="close-icon"
        />
      </div>
    <div className=" text-left text-sm">
          
              To Learn how to format a file, please review these{' '}
              <a className="text-blue-500 cursor-pointer">guidelines</a>.
           
          </div>
  
      <form className="dialog-form">
        <div className="flex flex-col">
          {/* Holder Dropdown */}
          <div className="form-control mb-4">
            <label className="block mt-4 text-left text-gray-500">Holder</label>
            <div className="dropdown relative">
              <select
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
                className="mt-2 p-2 border rounded w-full"
              >
                <option value="" disabled>
                  {isHoldersLoading ? 'Loading...' : 'Select Holder'}
                </option>
                {holders.map((holder, index) => (
                  <option key={index} value={holder.name}>
                    {holder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-control mb-4">
            <label className="block text-left text-gray-500">Template</label>
            <div className="relative ">
               <select className="mt-2 p-2 border rounded w-full">
                 <option value="template1">Template 1</option>
                 <option value="template2">Template 2</option>
                 <option value="template3">Template 3</option>
             </select>
             </div>
           </div>
                  <div className="form-control mb-4">
            <label className='block text-left text-gray-500'>Duplicate Handling</label>
             <div className="dropdown relative">
               <select className="mt-2 p-2 border rounded w-full">
  <option value="update">Update the Existing Record</option>
 
  <option value="do-not-upload">Do not upload the record</option>
 
  <option value="add-new">Add as a new Record</option>
</select>
            </div>
            </div>
          {/* File Drop Zone */}
          <div className="file-drop-zone mt-2 border border-dashed border-gray-300 p-12 text-center bg-gray-100 rounded-lg mb-4">
            <div className="cursor-pointer flex justify-center items-center" onClick={() => fileInputRef.current.click()}>
              <img src={cloudIcon} alt="cloud-upload" />
            </div>  
            <div>
              <span className="font-semibold text-lg text-gray-500">browse Files</span>
            </div>
            <div>
              <small className="text-xs text-gray-500">
                Drag and drop or{' '}
                <a className="text-blue-500 cursor-pointer" onClick={() => fileInputRef.current.click()}>
               click here
                </a>{' '}
                to select a file from your computer
              </small>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".csv"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Selected File Preview */}
          {selectedFile && (
            <div className="selected-file flex justify-between items-center p-2 bg-gray-200 rounded-lg mb-6">
              <div className="flex items-center">
                <img className="file-icon mr-2" src="/assets/images/csv-file-icon.svg" alt="csv-icon" />
                <span className="truncate">{selectedFile.name}</span>
              </div>
              <a onClick={handleFileClear} className="cursor-pointer">
                <img className="close-icon" src="/assets/images/close-icon.svg" alt="close-icon" />
              </a>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex mt-4 space-x-2">

<Button
        
          sx={{
            backgroundColor: '#007bff', // Primary blue color
            color: 'white',
            borderRadius: '10px',
            padding: '8px 25px',
            marginRight: '8px',
            textTransform:"none",

            '&:hover': {
              backgroundColor: '#0056b3' 
            }
          }}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
         
           className="custom-cancel-button"
           sx={{
            backgroundColor: "transparent",
            color: "gray",
            borderRadius: "10px",
            padding: "8px 25px",
            textTransform: "none",
            border: "1px solid gray", // Default border color
            transition: "all 0.3s ease-in-out",
        
            "&:hover, &:focus": {
              backgroundColor: "#f0f0f0",
              border: "1px solid #007bff", // Change border to blue
              color: "#007bff", // Change text color to blue
            },
        
            "&:hover svg path, &:focus svg path": {
              stroke: "#007bff", // Change SVG stroke to blue
            },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default UploadDialog;

















