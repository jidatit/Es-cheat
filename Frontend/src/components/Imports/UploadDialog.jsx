import React, { useState, useRef, useEffect } from "react";
import closeIcon from "../../assets/images/close-icon.svg";
import cloudIcon from "../../assets/images/cloud-upload-icon.svg";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizations, uploadFile } from "../../redux/Actions/UserSignin";
import { toast } from "sonner";
import { FileCopyOutlined } from "@mui/icons-material";
import { FaCross, FaXmark } from "react-icons/fa6";

const UploadDialog = ({ isOpen, onClose }) => {
  const [holder, setHolder] = useState(""); // Selected holder
  const [template, setTemplate] = useState(""); // Selected template
  const [dropDownValue, setDropDownValue] = useState(""); // Third dropdown value
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { organizations } = useSelector((state) => state.UserAuthentication);
  const dispatch = useDispatch();

  // Fetching holders from Redux store or API (if necessary)
  const { holders, isHoldersLoading } = useSelector(
    (state) => state.UserAuthentication
  );

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (organizations.length > 0) {
      const extractedHolders = organizations.flatMap((org) =>
        org.holders.map((holder) => ({ id: holder.id, name: holder.name }))
      );
      // Removed the automatic setting of default holder
    }
  }, [organizations]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileClear = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (holder && template && dropDownValue && selectedFile) {
      try {
        // Dispatch upload action with the selected data
        await dispatch(
          uploadFile(holder, template, dropDownValue, selectedFile)
        );
        toast.success("File uploaded successfully!");
      } catch (error) {
        toast.error("Upload failed. Please try again.");
      }
    } else {
      toast.error("Please fill all fields and select a file");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="dialog-container p-4 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between">
          <div>
            <h5 className="text-xl text-left font-semibold">
              Upload a CSV File
            </h5>
          </div>
          <img
            onClick={onClose}
            className="cursor-pointer"
            src={closeIcon}
            alt="close-icon"
          />
        </div>
        <div className="text-left text-sm">
          To learn how to format a file, please review these{" "}
          <a className="text-blue-500 cursor-pointer">guidelines</a>.
        </div>

        <form className="dialog-form" onSubmit={handleUpload}>
          <div className="flex flex-col">
            {/* Holder Dropdown */}
            <div className="form-control mb-4">
              <label className="block mt-4 text-left text-gray-500">
                Holder
              </label>
              <div className="dropdown relative">
                <select
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full"
                >
                  <option value="">Select Holder</option>
                  {holders.map((holder, index) => (
                    <option key={index} value={holder.id} className="p-3">
                      {holder.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Template Dropdown */}
            <div className="form-control mb-4">
              <label className="block text-left text-gray-500">Template</label>
              <div className="relative">
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full"
                >
                  <option value="">Select Template</option>
                  <option value="template1">Template 1</option>
                  <option value="template2">Template 2</option>
                  <option value="template3">Template 3</option>
                </select>
              </div>
            </div>

            {/* Third Dropdown: Duplicate Handling */}
            <div className="form-control mb-4">
              <label className="block text-left text-gray-500">
                Duplicate Handling
              </label>
              <div className="dropdown relative">
                <select
                  value={dropDownValue}
                  onChange={(e) => setDropDownValue(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full"
                >
                  <option value="">Select Duplicate Handling Option</option>
                  <option value="update">Update the Existing Record</option>
                  <option value="do-not-upload">
                    Do not upload the record
                  </option>
                  <option value="add-new">Add as a new Record</option>
                </select>
              </div>
            </div>

            {/* File Drop Zone */}
            <div className="file-drop-zone mt-2 border border-dashed border-gray-300 p-12 text-center bg-gray-100 rounded-lg mb-4">
              <div
                className="cursor-pointer flex justify-center items-center"
                onClick={() => fileInputRef.current.click()}
              >
                <img src={cloudIcon} alt="cloud-upload" />
              </div>
              <div>
                <span className="font-semibold text-lg text-gray-500">
                  Browse Files
                </span>
              </div>
              <div>
                <small className="text-xs text-gray-500">
                  Drag and drop or{" "}
                  <a
                    className="text-blue-500 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    click here
                  </a>{" "}
                  to select a file from your computer
                </small>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="selected-file flex justify-between items-center p-2 bg-gray-200 rounded-lg mb-6">
                <div className="flex items-center">
                  <FileCopyOutlined />
                  <span className="truncate">{selectedFile.name}</span>
                </div>
                <a onClick={handleFileClear} className="cursor-pointer">
                  <FaXmark />
                </a>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex mt-4 space-x-2">
            <Button
              sx={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "10px",
                padding: "8px 25px",
                marginRight: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
              type="submit"
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
                border: "1px solid gray",
                transition: "all 0.3s ease-in-out",
                "&:hover, &:focus": {
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #007bff",
                  color: "#007bff",
                },
                "&:hover svg path, &:focus svg path": {
                  stroke: "#007bff",
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
