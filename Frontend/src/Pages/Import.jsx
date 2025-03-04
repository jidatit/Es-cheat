import React, { useState, useEffect } from "react";
import UploadDialog from "../components/Imports/UploadDialog";
import FilterMenu from "../components/Imports/FilterMenu";
import ColumnSettingsMenu from "../components/Imports/ColumnSettingsMenu";
import uploadIcon from "../assets/images/upload-icon.svg";
import Alert from "../assets/images/alert-icon.svg";
import { Button } from "@mui/material";
import Trash from "../assets/images/trash-icon.svg";
import { IoArrowUpOutline } from "react-icons/io5";
import { IoArrowDownOutline } from "react-icons/io5";
import DeleteDialog from "../components/DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUpload,
  fetchFilteredUploads,
  fetchOrganizations,
  fetchUploads,
} from "../redux/Actions/UserSignin";
import { ResetUploadState } from "../redux/Slices/UserAuthenticationSlice";
import { LoadingSpinner } from "../App";

const ImportPage = () => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "",
    uploadIds: [],
    propertyIds: [],
  });
  const [subtitle, setSubtitle] = useState("");
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedUploads, setSelectedUploads] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const dispatch = useDispatch();
  const uploadsData = useSelector((state) => state.UserAuthentication.uploads);
  const [uploads, setUploads] = useState([
    {
      id: 1,
      file_name: "file1.csv",
      holder: { name: "Holder 1" },
      total_records: 100,
      successful_records: 90,
      failed_records: 10,
      created_at: new Date(),
      uploader: { first_name: "John", last_name: "Doe" },
      status: "COMPLETED",
    },
    {
      id: 2,
      file_name: "file2.csv",
      holder: { name: "Holder 2" },
      total_records: 200,
      successful_records: 180,
      failed_records: 20,
      created_at: new Date(),
      uploader: { first_name: "Jane", last_name: "Smith" },
      status: "COMPLETED",
    },
  ]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [columnList, setColumnList] = useState([
    { name: "Batch Id", checked: true, isDisabled: true, mandatory: true },
    { name: "File Name", checked: true, isDisabled: true, mandatory: true },
    { name: "Holder Name", checked: true, isDisabled: true, mandatory: true },
    { name: "Records", checked: true, isDisabled: true, mandatory: true },
    { name: "Succeed", checked: true, isDisabled: false, mandatory: false },
    { name: "Failed", checked: true, isDisabled: false, mandatory: false },
    { name: "Import date", checked: true, isDisabled: false, mandatory: false },
    { name: "User", checked: true, isDisabled: false, mandatory: false },
    { name: "Status", checked: true, isDisabled: false, mandatory: false },
  ]);
  const [tempColumnList, setTempColumnList] = useState([]);
  const isLoading = useSelector(
    (state) => state.UserAuthentication.isLoadingUploads
  );

  useEffect(() => {
    const filterData = { sortBy: "createdAt", order: "DESC", search: "" };
    dispatch(fetchUploads(filterData));
  }, [dispatch]);
  const filteredUploads = useSelector(
    (state) => state.UserAuthentication.filteredUploads
  );

  useEffect(() => {
    if (appliedFilters.length > 0 && filteredUploads.length > 0) {
      setUploads(filteredUploads);
    } else {
      setUploads(uploadsData); // Reset to all uploads when no filters are applied
    }
  }, [filteredUploads, uploadsData, appliedFilters]);

  const { holders, isHoldersLoading } = useSelector(
    (state) => state.UserAuthentication
  );
  useEffect(() => {
    // Reset properties and uploads when the component is mounted or switching tabs

    dispatch(ResetUploadState()); // Reset uploads in Redux
  }, []);
  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);
  const toggleAlerts = () => {
    setIsAlertsOpen(!isAlertsOpen);
  };
  useEffect(() => {
    // Update local state directly from Redux
    setUploads(uploadsData);
  }, [uploadsData]); // Now updates whenever Redux state changes
  useEffect(() => {
    return () => {
      console.log("ImportPage unmounting");
      dispatch(ResetUploadState());
    };
  }, [dispatch]);

  const openUploadFileDialogue = () => {
    setIsUploadDialogOpen(true);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
  const openDeleteDialogue = (title, ids) => {
    setDialogData({ title, uploadIds: Array.from(ids) }); // Convert Set to Array
    setSubtitle("Your subtitle here");
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (dialogData.uploadIds.length > 0) {
      await dispatch(deleteUpload(dialogData.uploadIds, setSelectedUploads)); // Pass the array of IDs
    }
    closeDeleteDialog();
  };

  const removeFilter = (index) => {
    const newFilters = appliedFilters.filter((_, i) => i !== index);
    setAppliedFilters(newFilters);

    if (newFilters.length === 0) {
      setUploads(uploadsData); // Reset uploads when all filters are removed
    }
  };
  const removeAllFilters = () => {
    setAppliedFilters([]);
    setUploads(uploadsData); // Reset uploads when all filters are cleared
  };

  const toggleCheckbox = (id) => {
    const newSelected = new Set(selectedUploads);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedUploads(newSelected);
  };

  const getDisplayedColumns = (columns) => {
    setColumnList(columns);
  };

  const getAppliedFilters = (filters) => {
    setAppliedFilters(filters);
  };

  const applyFilter = (dateRange, holder) => {
    // Extract numeric ID from holder string
    const holderId = holder ? parseInt(holder.match(/\d+/)?.[0], 10) : null;

    const filterData = {
      sortBy: "createdAt",
      order: "DESC",
      search: "",
      holders: holderId ? [holderId] : [],
    };

    dispatch(fetchFilteredUploads(filterData));

    // Update applied filters for UI display
    setAppliedFilters([
      {
        key: "dateRange",
        displayName: `From: ${dateRange.from} To: ${dateRange.to}`,
      },
      { key: "holder", displayName: `Holder: ${holder}` },
    ]);
  };

  // Toggle sorting direction
  const toggleSort = (columnKey) => {
    let direction = "ASC"; // Default to ascending order

    if (sortConfig.key === columnKey && sortConfig.direction === "ASC") {
      direction = "DESC"; // Toggle to descending if currently ascending
    }

    setSortConfig({ key: columnKey, direction });

    // Send API request with updated sorting parameters
    const filterData = { sortBy: columnKey, order: direction, search: "" };
    dispatch(fetchUploads(filterData));
  };

  const getIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <IoArrowUpOutline />
    ) : (
      <IoArrowDownOutline />
    );
  };

  const getDefaultIcon = (key) => {
    if (sortConfig.key === key) return null;
    return <IoArrowDownOutline />;
  };

  const toggleColumnFilter = () => {
    setTempColumnList([...columnList]); // Create a copy of current columns
    setIsColumnMenuOpen(!isColumnMenuOpen);
  };

  // Update the toggleColumn function to work with temporary state
  const toggleColumn = (column) => {
    const newTempColumnList = tempColumnList.map((col) =>
      col.name === column.name ? { ...col, checked: !col.checked } : col
    );
    setTempColumnList(newTempColumnList);
  };

  // Update onApplyClick to apply the temporary changes
  const onApplyClick = () => {
    setColumnList(tempColumnList); // Apply the temporary changes
    setIsColumnMenuOpen(false);
  };

  // Add onCloseMenu function to handle cancel
  const onCloseMenu = () => {
    setTempColumnList([...columnList]); // Reset temporary changes
    setIsColumnMenuOpen(false);
  };

  const onSaveClick = () => {
    // Implement save logic
    setIsUploadDialogOpen(false);
  };

  const toggleSelectAll = () => {
    if (selectedUploads.size === uploads.length) {
      setSelectedUploads(new Set()); // Deselect all
    } else {
      setSelectedUploads(new Set(uploads.map((item) => item.id))); // Select all
    }
  };

  useEffect(() => {
    const selectAllCheckbox = document.querySelector(
      "thead input[type='checkbox']"
    );
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        selectedUploads.size > 0 && selectedUploads.size < uploads.length;
    }
  }, [selectedUploads]);
  // if (!uploads?.length && isLoading) {
  //   return (
  //     <div className="property-table overflow-x-auto relative">
  //       <table className="min-w-max w-full table-auto border-collapse">
  //         <thead className="sticky top-0 bg-white font-normal">
  //           <tr className="text-gray-500 font-normal text-md">
  //             <th className="px-4 py-2 font-normal">
  //               <input
  //                 type="checkbox"
  //                 className="w-5 h-5 cursor-pointer"
  //                 disabled
  //               />
  //             </th>
  //             {columnList
  //               .filter((col) => col.checked)
  //               .map((column, index) => (
  //                 <th key={index} className="px-4 py-2 font-normal">
  //                   <div className="flex items-center">{column.name}</div>
  //                 </th>
  //               ))}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <td colSpan={columnList.filter((col) => col.checked).length + 1}>
  //               <LoadingSpinner />
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // }

  // if (!uploads?.length) {
  //   return (
  //     <AppNoData
  //       title="No Uploads Available"
  //       subtitle="Upload any new file to display it here."
  //     />
  //   );
  // }
  return (
    <div className="">
      <div className=" flex justify-between items-center gap-[3.2rem] mb-[2.4rem]">
        <h1 className="font-semibold text-2xl leading-7 w-1/10">Imports</h1>
        <div>
          <button
            className="border border-light-orange bg-[#FFA500] rounded-full w-12 h-12 flex justify-center items-center"
            onClick={toggleAlerts}
          >
            <img src={Alert} alt="import" />
          </button>
          {isAlertsOpen && (
            <AppAlertRecords
              isOpen={isAlertsOpen}
              closeAlert={() => setIsAlertsOpen(false)}
            />
          )}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg">
        <div className=" flex justify-between items-center mb-9">
          <div className=" flex gap=[1.2rem] items-center">
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
              onClick={openUploadFileDialogue}
            >
              <img src={uploadIcon} alt="import" className="mr-2" />
              Upload
            </Button>
            <div className="ml-1 relative">
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
                className={`column-filter-btn gap-2 secondary-btn column-filter-icon flex items-center ${
                  isColumnMenuOpen ? "selected" : ""
                }`}
                onClick={toggleColumnFilter}
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
              <ColumnSettingsMenu
                isOpen={isColumnMenuOpen}
                columnList={tempColumnList} // Use temporary list for display
                toggleColumn={toggleColumn}
                onApplyClick={onApplyClick}
                onCloseMenu={onCloseMenu}
              />
            </div>
            <div className="relative ml-3">
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
                className={`filtermenu-btn secondary-btn gap-2 filter-icon flex items-center ${
                  isFilterMenuOpen ? "selectedFilter" : ""
                }`}
                onClick={toggleFilterMenu}
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
              <FilterMenu
                isOpen={isFilterMenuOpen}
                onClose={() => setIsFilterMenuOpen(false)}
                onApplyFilter={applyFilter}
                holdersList={holders}
              />
            </div>
          </div>

          <div className=" flex items-center">
            {selectedUploads.size > 0 && (
              <div className="selected-row flex items-center">
                <span className="text-[14px] text-gray-600">
                  {selectedUploads.size} Selected
                </span>
                <button
                  className="delete-btn flex items-center ml-4 border-2 text-sm border-red-400 px-4 py-1.5 rounded-lg"
                  onClick={
                    () => openDeleteDialogue("Delete Upload", selectedUploads) // Pass the Set directly
                  }
                >
                  <img src={Trash} alt="delete-icon" className="mr-2" />
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
        </div>
        {appliedFilters.length > 0 && (
          <div className="flex justify-between items-center p-4 bg-white">
            <div className="flex items-center flex-wrap gap-2">
              <div className="text-sm text-gray-500">Applied Filter:</div>
              {appliedFilters.map((filter, i) => (
                <div
                  key={i}
                  className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  <span className="text-gray-700">{filter.displayName}</span>
                  <button
                    onClick={() => removeFilter(i)}
                    className="ml-2 p-1 hover:opacity-80"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={removeAllFilters}
              className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100"
            >
              Clear All ({appliedFilters.length})
            </button>
          </div>
        )}
        {isLoading ? (
          <div className=" ">
            {" "}
            <div className="flex items-center justify-center h-[35vh] loading-spinner">
              <div className="w-16 h-16 border-4 rounded-full border-t-transparent border-blue-600 animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            {uploads?.length > 0 ? (
              <div
                className={`property-table overflow-x-auto relative ${
                  appliedFilters.length > 0 ? "height-applied-filter" : ""
                } ${
                  selectedUploads.size > 0 && appliedFilters.length > 0
                    ? "height-menu"
                    : ""
                }`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse table-auto">
                    <thead className="sticky top-0 bg-white">
                      <tr className="text-gray-500 text-md">
                        <th className="w-16 px-4 py-3 text-left font-normal">
                          <input
                            type="checkbox"
                            className="w-5 h-5 mt-2 cursor-pointer"
                            indeterminate={
                              selectedUploads.size > 0 &&
                              selectedUploads.size < uploads.length
                            }
                            onChange={toggleSelectAll}
                          />
                        </th>
                        {columnList
                          .filter((col) => col.checked) // Only show checked columns
                          .map((column, index) => (
                            <th key={index} className="px-4 py-2 font-normal">
                              <div
                                onClick={() => toggleSort(column.name)}
                                className="flex items-center cursor-pointer group"
                              >
                                {column.name}
                                <span className="ml-1 opacity-0 group-hover:opacity-100">
                                  {getIcon(column.name) || (
                                    <IoArrowDownOutline />
                                  )}
                                </span>
                              </div>
                            </th>
                          ))}
                      </tr>
                    </thead>

                    <tbody>
                      {(appliedFilters.length > 0 ? uploads : uploadsData)
                        ?.length > 0 ? (
                        (appliedFilters.length > 0 ? uploads : uploadsData).map(
                          (element, index) => (
                            <tr
                              key={index}
                              className={`border-none transition duration-200 ease-in-out ${
                                selectedUploads.has(element.id)
                                  ? "bg-blue-100 bg-opacity-50"
                                  : "hover:bg-blue-100 hover:bg-opacity-50"
                              }`}
                            >
                              <td className="px-4 py-3">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 mt-2 cursor-pointer"
                                  checked={selectedUploads.has(element.id)}
                                  onChange={() => toggleCheckbox(element.id)}
                                />
                              </td>
                              {columnList.map(
                                (column, colIndex) =>
                                  column.checked && (
                                    <td
                                      key={colIndex}
                                      className="px-4 py-3 text-gray-600 text-left"
                                    >
                                      {column.name === "Batch Id" &&
                                        element?.id}
                                      {column.name === "File Name" &&
                                        element?.file_name}
                                      {column.name === "Holder Name" &&
                                        element?.holder?.name}
                                      {column.name === "Records" &&
                                        element?.total_records}
                                      {column.name === "Succeed" &&
                                        element?.successful_records}
                                      {column.name === "Failed" && (
                                        <span className="text-[#CB0000]">
                                          {element?.failed_records}
                                        </span>
                                      )}
                                      {column.name === "Import date" &&
                                        new Date(
                                          element.created_at
                                        ).toLocaleString()}
                                      {column.name === "User" &&
                                        `${element?.uploader?.first_name} ${element?.uploader?.last_name}`}
                                      {column.name === "Status" && (
                                        <span
                                          className={`px-2 py-1 rounded font-semibold   ${
                                            element.status === "FAILED"
                                              ? "text-[#CB0000] bg-[#D8E7E5] bg-opacity-50"
                                              : "text-[#3EA102] bg-[#D8E7E5] bg-opacity-50"
                                          }`}
                                        >
                                          {element?.status}
                                        </span>
                                      )}
                                    </td>
                                  )
                              )}
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan="100%"
                            className="text-center py-4 text-gray-500"
                          >
                            No uploads found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <AppNoData
                title="No Uploads Available"
                subtitle="Upload any new file to display it here."
              />
            )}
          </>
        )}
      </div>

      <UploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onSave={onSaveClick}
      />
    </div>
  );
};

const AppAlertRecords = ({ isOpen, closeAlert }) => {
  // Implement alert records component
  return null;
};

const AppNoData = ({ title, subtitle }) => {
  return (
    <div className="no-data flex justify-center items-center p-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default ImportPage;
