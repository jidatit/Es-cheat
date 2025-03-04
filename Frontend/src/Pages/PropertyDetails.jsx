import React, { useState, useEffect } from "react";
// import PropertyExpansionPanel from './PropertyExpansionPanel';
import Details from "../components/Details";
import plusIcon from "../assets/images/plus-icon.svg";
import searchIcon from "../assets/images/search-icon.svg";
import trashIcon from "../assets/images/trash-icon.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@mui/material";
import DeleteDialog from "../components/DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProperties,
  fetchOrganizations,
  fetchUploadRecords,
  fetchUploads,
} from "../redux/Actions/UserSignin";
import {
  ResetPropertiesState,
  ResetUploadState,
} from "../redux/Slices/UserAuthenticationSlice";
import { Select, MenuItem, FormControl } from "@mui/material";
import { IoMdCheckmark } from "react-icons/io";

import { debounce } from "lodash"; // or any other debounce utility
import { Check } from "lucide-react";
const Properties = ({ isLoading }) => {
  const [searchControl, setSearchControl] = useState("");
  const [isExpansionPanelOpen, setExpansionPanelOpen] = useState(false);
  const [property, setProperty] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "",
    uploadIds: [],
    propertyIds: [],
  });
  const [subtitle, setSubtitle] = useState("");

  const [selectedProperties, setSelectedProperties] = useState(new Set());
  const {
    organizations,
    isLoadingOrganizations,
    uploads,
    isLoadingUploads,
    properties,
  } = useSelector((state) => state.UserAuthentication);
  const [searchText, setSearchText] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const dispatch = useDispatch();
  const [propertie, setProperties] = useState(properties);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!disabled) setAnchorEl(event.currentTarget);
  };
  const handleClose = (optionValue) => {
    setAnchorEl(null);
    if (optionValue) onChange(optionValue);
  };
  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);
  useEffect(() => {
    if (organizations.length > 0) {
      const extractedHolders = organizations.flatMap((org) =>
        org.holders.map((holder) => ({ id: holder.id, name: holder.name }))
      );
      setHolder(extractedHolders);

      // Set default selected holder if available
      if (extractedHolders.length > 0) {
        setHolder(extractedHolders[0].id);
      } else {
        setHolder(""); // Reset selection if no holders
      }
    }
  }, [organizations]);
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredProperties(properties);
      return;
    }

    const searchLower = searchText.toLowerCase();
    const filtered = properties.filter((property) => {
      // Search through all relevant fields
      return (
        property.first_name?.toLowerCase().includes(searchLower) ||
        property.last_name?.toLowerCase().includes(searchLower) ||
        property.property_type?.toLowerCase().includes(searchLower) ||
        property.amount?.toString().toLowerCase().includes(searchLower) ||
        property.state?.toLowerCase().includes(searchLower) ||
        property.status?.toLowerCase().includes(searchLower) ||
        new Date(property.date_of_last_contact)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower)
      );
    });

    setFilteredProperties(filtered);
  }, [searchText, properties]);

  const toggleSelectAll = () => {
    setSelectedProperties((prevSelected) => {
      if (prevSelected.size === properties.length) {
        return new Set(); // Deselect all
      } else {
        return new Set(properties.map((item) => item.id)); // Select all IDs
      }
    });
  };

  const toggleCheckbox = (id) => {
    setSelectedProperties((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };
  useEffect(() => {
    // Reset properties and uploads when the component is mounted or switching tabs
    dispatch(ResetPropertiesState()); // Reset properties in Redux
    dispatch(ResetUploadState()); // Reset uploads in Redux
  }, []);

  useEffect(() => {
    const selectAllCheckbox = document.querySelector(
      "thead input[type='checkbox']"
    );
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedProperties.size > 0 &&
        selectedProperties.size < properties.length;
      selectAllCheckbox.checked = selectedProperties.size === properties.length;
    }
  }, [selectedProperties, properties.length]);

  const openDeleteDialogue = (title, ids) => {
    setDialogData({ title, ...ids });
    setSubtitle("Your subtitle here");
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
  useEffect(() => {
    // Reset properties and uploads when the component is mounted or switching tabs
    dispatch(ResetPropertiesState());
    dispatch(ResetUploadState()); // Reset uploads in Redux
  }, []);
  const handleConfirmDelete = async () => {
    try {
      if (selectedProperties.size > 0 && selectedUpload) {
        const ids = Array.from(selectedProperties);
        // Dispatch the delete action with the selected properties' IDs
        await dispatch(
          deleteProperties(
            selectedUpload,
            ids,
            selectedUpload,
            setSelectedProperties
          )
        );

        // After successful deletion, fetch the updated properties

        // Close the delete dialog

        closeDeleteDialog();
      }
    } catch (error) {
      console.error("Delete failed", error);
      // Optionally show an error message
    }
  };

  const onScrolledDown = () => {
    // Implementation for infinite scroll
  };
  const openExpansionPanel = (property) => {
    setProperty(property);
    setExpansionPanelOpen(true);
  };
  useEffect(() => {
    const selectAllCheckbox = document.querySelector(
      "thead input[type='checkbox']"
    );
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedProperties.size > 0 &&
        selectedProperties.size < properties.length;
    }
  }, [selectedProperties, properties.length]);

  const [holder, setHolder] = useState("");
  const [selectedUpload, setSelectedUpload] = useState("");

  // Handle Holder Selection
  // In Properties component
  const selectHolder = (holderId) => {
    if (!holderId) return; // Don't fetch if no holder selected
    setHolder(holderId);
    const requestBody = {
      sortBy: "createdAt",
      order: "DSC",
      holders: [parseInt(holderId)],
      onlySuccessfulUploads: true,
    };
    dispatch(fetchUploads(requestBody));
    setSelectedUpload(""); // Reset upload selection
  };

  // Update uploads when data changes
  useEffect(() => {
    if (uploads.length > 0 && !selectedUpload) {
      const firstUploadId = uploads[0].id;
      setSelectedUpload(firstUploadId);
      dispatch(fetchUploadRecords(firstUploadId, "")); // Fetch properties for the selected upload
    } else if (uploads.length === 0) {
      dispatch(ResetPropertiesState());
    }
  }, [uploads]);

  // Handle selected upload change
  // useEffect(() => {
  //   if (selectedUpload) {
  //     dispatch(fetchUploadRecords(selectedUpload, "")); // Fetch properties for the selected upload
  //   } else {
  //     dispatch(ResetUploadState());
  //     dispatch(ResetPropertiesState()); // Clear properties if no upload is selected
  //   }
  // }, [selectedUpload]);

  const debouncedFetch = debounce((value) => {
    dispatch(fetchUploadRecords(selectedUpload, value));
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchControl(value);

    if (selectedUpload) {
      // Cancel any pending debounced searches
      debouncedFetch.cancel();

      // if (value.trim() === "") {
      //   // Immediate fetch for empty search - no debounce
      // dispatch(fetchUploadRecords(selectedUpload, value));
      // } else {
      // Debounced fetch for non-empty searches
      debouncedFetch(value);
      // }
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);
  useEffect(() => {
    // Reset properties and uploads when the component is mounted or when switching tabs
    setProperties([]); // Reset local properties state
    setSelectedUpload(""); // Reset selected upload state
    dispatch(ResetPropertiesState()); // Dispatch action to reset properties in Redux
    dispatch(ResetUploadState()); // Dispatch action to reset uploads in Redux
  }, []); // This runs when the component is mounted

  return (
    <div>
      <div className=" flex justify-between items-center gap-[3.2rem] mb-[2.4rem]">
        <h1 class="font-semibold text-2xl leading-7 w-1/10">Properties</h1>
        <div className="flex flex-wrap items-center gap-4 p-4">
          {/* Holder Dropdown */}
          <FormControl className="w-56">
            <Select
              value={holder}
              onChange={(e) => selectHolder(e.target.value)}
              disabled={isLoadingOrganizations}
              className="w-full bg-white font-poppins"
              MenuProps={{
                PaperProps: {
                  className: "mt-2",
                },
              }}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return isLoadingOrganizations
                    ? "Loading holders..."
                    : "Select a Holder";
                }
                const selectedHolder = organizations
                  ?.flatMap((org) => org.holders)
                  .find((h) => h.id === selected);
                return selectedHolder?.name || "";
              }}
            >
              <MenuItem value="" disabled>
                {isLoadingOrganizations
                  ? "Loading holders..."
                  : "Select a Holder"}
              </MenuItem>
              {organizations?.length > 0 &&
                organizations.flatMap((org) =>
                  org.holders.map((holderOption) => (
                    <MenuItem
                      value={holderOption.id}
                      key={holderOption.id}
                      className={`group hover:bg-blue-50 ${
                        holder === holderOption.id
                          ? "bg-blue-700 hover:bg-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between w-full px-2 py-1">
                        <span
                          className={`flex-1 font-poppins ${
                            holder === holderOption.id
                              ? "text-blue-600"
                              : "text-gray-900"
                          }`}
                        >
                          {holderOption.name}
                        </span>
                        <div className="flex-shrink-0 ml-8">
                          {holder === holderOption.id && (
                            <Check className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </MenuItem>
                  ))
                )}
            </Select>
          </FormControl>
          {/* Upload Dropdown */}
          <FormControl className="w-80">
            <Select
              value={selectedUpload}
              onChange={(e) => setSelectedUpload(e.target.value)}
              disabled={isLoadingUploads || uploads.length === 0}
              className="w-full bg-white"
              MenuProps={{
                PaperProps: {
                  className: "mt-2",
                },
              }}
              displayEmpty
              renderValue={(selected) => {
                if (isLoadingUploads) return "Loading...";
                if (uploads.length === 0) return "No files available";
                if (!selected) return "Select a file";

                const selectedFile = uploads.find(
                  (file) => file.id === selected
                );
                return selectedFile?.file_name || "";
              }}
            >
              {isLoadingUploads ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : uploads.length > 0 ? (
                uploads.map((file) => (
                  <MenuItem
                    value={file.id}
                    key={file.id}
                    className={`flex items-center justify-between ${
                      selectedUpload === file.id ? "bg-blue-50" : ""
                    }`}
                  >
                    {" "}
                    <div className="flex items-center justify-between w-full px-2">
                      <span
                        className={`flex-1 font-poppins ${
                          selectedUpload === file.id
                            ? "text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        {file.file_name}
                      </span>
                      {selectedUpload === file.id && (
                        <IoMdCheckmark className="text-blue-500" size={20} />
                      )}
                    </div>
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No files available</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3">
        <div className=" flex justify-between items-center mb-9">
          <div className="flex gap=[1.2rem] items-center">
            <Button
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
              className=" flex   justify-center items-center"
            >
              <img src={plusIcon} alt="import" className="mr-2" />
              Upload
            </Button>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "gray",
                borderRadius: "10px",
                padding: "8px 25px",
                textTransform: "none",
                border: "1px solid gray", // Default border color
                transition: "all 0.3s ease-in-out",
                marginRight: "0.5rem",

                "&:hover, &:focus": {
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #007bff", // Change border to blue
                  color: "#007bff", // Change text color to blue
                },

                "&:hover svg path, &:focus svg path": {
                  stroke: "#007bff", // Change SVG stroke to blue
                },
              }}
              className={`column-filter-btn gap-2 secondary-btn column-filter-icon flex items-center `}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.5V14.5M10 2.5V14.5M5.2 2.5H10.8C11.9201 2.5 12.4802 2.5 12.908 2.71799C13.2843 2.90973 13.5903 3.21569 13.782 3.59202C14 4.01984 14 4.5799 14 5.7V11.3C14 12.4201 14 12.9802 13.782 13.408C13.5903 13.7843 13.2843 14.0903 12.908 14.282C12.4802 14.5 11.9201 14.5 10.8 14.5H5.2C4.07989 14.5 3.51984 14.5 3.09202 14.282C2.71569 14.0903 2.40973 13.7843 2.21799 13.408C2 12.9802 2 12.4201 2 11.3V5.7C2 4.57989 2 4.01984 2.21799 3.59202C2.40973 2.90973 2.71569 2.90973 3.09202 2.71799C3.51984 2.5 4.0799 2.5 5.2 2.5Z"
                  stroke="#7F7F7F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Column
            </Button>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "gray",
                borderRadius: "10px",
                padding: "8px 30px",
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
              className={`filtermenu-btn secondary-btn gap-2 filter-icon flex items-center`}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33337 3.56667C1.33337 3.1933 1.33337 3.00661 1.40604 2.86401C1.46995 2.73856 1.57194 2.63658 1.69738 2.57266C1.83999 2.5 2.02667 2.5 2.40004 2.5H13.6C13.9734 2.5 14.1601 2.5 14.3027 2.57266C14.4281 2.63658 14.5301 2.73856 14.594 2.86401C14.6667 3.00661 14.6667 3.1933 14.6667 3.56667V4.01293C14.6667 4.19213 14.6667 4.28173 14.6448 4.36504C14.6254 4.43887 14.5935 4.50882 14.5504 4.57184C14.5018 4.64295 14.4341 4.70164 14.2986 4.819L10.0348 8.51434C9.89936 8.6317 9.83166 8.69038 9.78304 8.76149C9.73995 8.82451 9.70801 8.89446 9.68861 8.96829C9.66671 9.05161 9.66671 9.14121 9.66671 9.3204V12.8056C9.66671 12.936 9.66671 13.0011 9.64568 13.0575C9.6271 13.1073 9.59688 13.1519 9.55754 13.1877C9.51302 13.2281 9.4525 13.2524 9.33145 13.3008L7.06478 14.2074C6.81975 14.3054 6.69724 14.3545 6.59889 14.334C6.51288 14.3161 6.43741 14.265 6.38888 14.1918C6.33337 14.1081 6.33337 13.9762 6.33337 13.7122V9.3204C6.33337 9.14121 6.33337 9.05161 6.31148 8.96829C6.29207 8.89446 6.26013 8.82451 6.21705 8.76149C6.16843 8.69038 6.10072 8.6317 5.9653 8.51434L1.70145 4.819C1.56603 4.70164 1.49832 4.64295 1.4497 4.57184C1.40662 4.50882 1.37468 4.43887 1.35527 4.36504C1.33337 4.28173 1.33337 4.19213 1.33337 4.01293V3.56667Z"
                  stroke="#7F7F7F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Filter
            </Button>

            <div className="relative  ml-[0.5rem] flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white w-[20rem]">
              {/* Search Button */}
              <button className="mr-2">
                <img src={searchIcon} alt="search" className="w-5 h-5" />
              </button>

              {/* Search Input */}
              <input
                type="text"
                value={searchControl}
                onChange={(e) => handleSearchChange(e)} // pass the event object
                placeholder="Search keyword"
                className="w-full outline-none bg-transparent"
              />
              {/* <input
                type="text"
                placeholder="Search in all fields..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full outline-none bg-transparent"
              /> */}
              {/* Slash Shortcut Indicator */}
              <div className="absolute right-2 flex justify-center items-center w-5 h-5 border border-gray-200 rounded-md text-gray-500 text-sm bg-gray-100">
                /
              </div>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex items-center ">
              {selectedProperties.size > 0 && (
                <div className="selected-row flex items-center">
                  <span className="text-[14px] text-gray-600">
                    {selectedProperties.size} Selected
                  </span>
                  <button
                    className="delete-btn flex items-center ml-4 border-2 text-sm border-red-400 px-4 py-1.5 rounded-lg"
                    onClick={() =>
                      openDeleteDialogue("import", { uploadIds: [1, 2, 3] })
                    }
                  >
                    <img src={trashIcon} alt="delete-icon" className="mr-2" />
                    Delete
                  </button>

                  {isDeleteDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <DeleteDialog
                        data={dialogData}
                        subtitle={subtitle}
                        close={closeDeleteDialog}
                        onConfirmClick={handleConfirmDelete}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <Button
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
                className={`column-filter-btn gap-2 secondary-btn column-filter-icon flex items-center`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.66634 10.8282C1.86235 10.29 1.33301 9.37347 1.33301 8.33333C1.33301 6.77095 2.52735 5.48753 4.05284 5.34625C4.36488 3.44809 6.01317 2 7.99967 2C9.98618 2 11.6345 3.44809 11.9465 5.34625C13.472 5.48753 14.6663 6.77095 14.6663 8.33333C14.6663 9.37347 14.137 10.29 13.333 10.8282M5.33301 11.3333L7.99967 14M7.99967 14L10.6663 11.3333M7.99967 14V8"
                    stroke="black"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download
              </Button>
            </div>
          </div>
        </div>
        {isLoadingUploads ? (
          <>
            <div className=" ">
              {" "}
              <div className="flex items-center justify-center h-[35vh] loading-spinner">
                <div className="w-16 h-16 border-4 rounded-full border-t-transparent border-blue-600 animate-spin"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="property-table" onScroll={onScrolledDown}>
            {properties.length > 0 && uploads.length > 0 ? (
              <div className="property-table w-full" onScroll={onScrolledDown}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse table-fixed">
                    <thead className="sticky top-0 bg-white">
                      <tr className="text-gray-500 text-md">
                        <th className="w-16 px-4 py-3 text-left font-normal">
                          <input
                            type="checkbox"
                            className="w-5 h-5 cursor-pointer"
                            indeterminate={
                              selectedProperties.size > 0 &&
                              selectedProperties.size < properties.length
                            }
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th className="w-32 px-4 py-3 text-left font-normal">
                          First Name
                        </th>
                        <th className="w-32 px-4 py-3 text-left font-normal">
                          Last Name
                        </th>
                        <th className="w-32 px-4 py-3 text-left font-normal">
                          Property Type
                        </th>
                        <th className="w-24 px-4 py-3 text-left font-normal">
                          Balance
                        </th>
                        <th className="w-32 px-4 py-3 text-left font-normal">
                          Letter Required
                        </th>
                        <th className="w-32 px-4 py-3 text-left font-normal">
                          Email Required
                        </th>
                        <th className="w-24 px-4 py-3 text-left font-normal">
                          State
                        </th>
                        <th className="w-32 px-4 py-3 text-left font-normal">
                          Report Due
                        </th>
                        <th className="w-32 px-4 py-3 text-left font-normal">
                          Last Activity
                        </th>
                        <th className="w-24 px-4 py-3 text-left font-normal">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((element) => (
                        <tr
                          key={element.id}
                          className={`transition duration-200 ease-in-out cursor-pointer
                  ${
                    selectedProperties.has(element.id)
                      ? "bg-blue-100 bg-opacity-50"
                      : "hover:bg-blue-100 hover:bg-opacity-50"
                  }`}
                          onDoubleClick={() => openExpansionPanel(element)}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5 cursor-pointer"
                              checked={selectedProperties.has(element.id)}
                              onChange={() => toggleCheckbox(element.id)}
                            />
                          </td>
                          <td className="px-4 py-3 text-black font-medium">
                            {element?.first_name}
                          </td>
                          <td className="px-4 py-3 text-black font-medium">
                            {element?.last_name}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {element?.property_type}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {element?.amount}
                          </td>
                          <td className="px-4 py-3 text-gray-600">Yes</td>
                          <td className="px-4 py-3 text-gray-600">No</td>
                          <td className="px-4 py-3 text-gray-600">
                            {element?.state}
                          </td>
                          <td className="px-4 py-3 text-gray-600">04/18/24</td>
                          <td className="px-4 py-3 text-gray-600">
                            {new Date(
                              element?.date_of_last_contact
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded font-semibold   ${
                                element.status === "FAILED"
                                  ? "text-[#CB0000] bg-[#D8E7E5] bg-opacity-50"
                                  : "text-[#3EA102] bg-[#D8E7E5] bg-opacity-50"
                              }`}
                            >
                              {element?.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              !isLoading && (
                <div className="text-center text-gray-400 font-normal">
                  <h2 className="font-bold">No Properties Available</h2>
                  <p>Create any new property to display it here.</p>
                </div>
              )
            )}
          </div>
        )}

        {isExpansionPanelOpen && (
          <Details
            isOpen={isExpansionPanelOpen}
            propertyData={property}
            close={() => setExpansionPanelOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Properties;
