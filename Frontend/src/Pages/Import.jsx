import React, { useState,useEffect } from 'react';
import UploadDialog from '../components/Imports/UploadDialog';
import FilterMenu from '../components/Imports/FilterMenu';
import ColumnSettingsMenu from '../components/Imports/ColumnSettingsMenu';
import uploadIcon from '../assets/images/upload-icon.svg'; 
import Alert from '../assets/images/alert-icon.svg'; 
import { Button } from '@mui/material';
 import Trash from '../assets/images/trash-icon.svg';
 import { IoArrowUpOutline } from "react-icons/io5";
 import { IoArrowDownOutline } from "react-icons/io5";
 import DeleteDialog from '../components/DeleteDialog';
 import AppAlertRecords from './AppAlertRecords';


const ImportPage = () => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ title: '', uploadIds: [], propertyIds: [] });
  const [subtitle, setSubtitle] = useState('');
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedUploads, setSelectedUploads] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [uploads, setUploads] = useState([
        {
      id: 1,
      file_name: 'file1.csv',
      holder: { name: 'Holder 1' },
      total_records: 100,
      successful_records: 90,
      failed_records: 10,
      created_at: new Date(),
      uploader: { first_name: 'John', last_name: 'Doe' },
      status: 'COMPLETED'
    },
    {
      id: 2,
      file_name: 'file2.csv',
      holder: { name: 'Holder 2' },
      total_records: 200,
      successful_records: 180,
      failed_records: 20,
      created_at: new Date(),
      uploader: { first_name: 'Jane', last_name: 'Smith' },
      status: 'COMPLETED'
    } 
  ]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [columnList, setColumnList] = useState([
    { name: 'Batch Id', checked: true, isDisabled: false },
    { name: 'File Name', checked: true, isDisabled: false },
    { name: 'Holder Name', checked: true, isDisabled: false },
    { name: 'Records', checked: true, isDisabled: false },
    { name: 'Succeed', checked: true, isDisabled: false },
    { name: 'Failed', checked: true, isDisabled: false },
    { name: 'Import date', checked: true, isDisabled: false },
    { name: 'User', checked: true, isDisabled: false },
    { name: 'Status', checked: true, isDisabled: false },
  ]);

  const toggleAlerts = () => {
    setIsAlertsOpen(!isAlertsOpen);
  };

  const openUploadFileDialogue = () => {
    setIsUploadDialogOpen(true);
  };

  const toggleColumnFilter = () => {
    setIsColumnMenuOpen(!isColumnMenuOpen);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

     const openDeleteDialogue = (title, ids) => {
    setDialogData({ title, ...ids });
    setSubtitle('Your subtitle here');
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // Implement delete confirmation logic here
    console.log('Delete confirmed');
    closeDeleteDialog();
  };


  const removeFilter = (index) => {
    const newFilters = appliedFilters.filter((_, i) => i !== index);
    setAppliedFilters(newFilters);
  };

  const removeAllFilters = () => {
    setAppliedFilters([]);
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
    // Implement filter application logic
  };

    // Toggle sorting direction
  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
const getIcon = (key) => {
  if (sortConfig.key !== key) return null;
  return sortConfig.direction === "asc" ? <IoArrowUpOutline /> : <IoArrowDownOutline />;
};

const getDefaultIcon = (key) => {
  if (sortConfig.key === key) return null;
  return <IoArrowDownOutline />;
};

  const toggleColumn = (column) => {
    const newColumnList = columnList.map((col) =>
      col.name === column.name ? { ...col, checked: !col.checked } : col
    );
    setColumnList(newColumnList);
  };

  const onApplyClick = () => {
    // Implement apply column settings logic
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
    const selectAllCheckbox = document.querySelector("thead input[type='checkbox']");
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate = selectedUploads.size > 0 && selectedUploads.size < uploads.length;
    }
  }, [selectedUploads]);
  
  

  return (
    <div className="">
      <div className=" flex justify-between items-center gap-[3.2rem] mb-[2.4rem]">
      <h1 class="font-semibold text-2xl leading-7 w-1/10">Imports</h1>
        <div>    
          <button className="border border-light-orange bg-[#FFA500] rounded-full w-12 h-12 flex justify-center items-center"
           onClick={toggleAlerts}>
            <img src={Alert} alt="import" />
          </button>
          {isAlertsOpen && (
            <AppAlertRecords isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />
          )}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg">
        <div className=" flex justify-between items-center mb-9">
          <div className=" flex gap=[1.2rem] items-center">
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
            className=" flex   justify-center items-center" 
            onClick={openUploadFileDialogue}>
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
                className={`column-filter-btn gap-2 secondary-btn column-filter-icon flex items-center ${isColumnMenuOpen ? 'selected' : ''}`}
                onClick={toggleColumnFilter}
              >
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                columnList={columnList}
                toggleColumn={toggleColumn}
                onApplyClick={onApplyClick}
                onCloseMenu={() => setIsColumnMenuOpen(false)}
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
                className={`filtermenu-btn secondary-btn gap-2 filter-icon flex items-center ${isFilterMenuOpen ? 'selectedFilter' : ''}`}
                onClick={toggleFilterMenu}
              >
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                holdersList={[] /* Pass the actual holders list here */}
              />
            </div>
          </div>



          <div className=" flex items-center">
            {selectedUploads.size > 0 && (
              <div className="selected-row flex items-center">
                <span className='mr-2'>{selectedUploads.size} Selected</span>
                <Button
                  sx={{
                    backgroundColor: "transparent",
                    color: "#CB0000",
                    borderRadius: "10px",
                    padding: "6px 20px",
                    textTransform: "none",
                    border: "1px solid #CB0000", // Default border color
                    transition: "all 0.3s ease-in-out",
                
                    "&:hover, &:focus": {
                      backgroundColor: "none",
                      border: "1px solid #CB0000", // Change border to blue
                      color: "#CB0000", // Change text color to blue
                    },
                
                  }}
                
                 className=" flex items-center ml-4"
                //  onClick={openDeleteDialogue}
                      onClick={() => openDeleteDialogue('import',
                 { uploadIds: [1, 2, 3] })}

                >
                  <img src={Trash} alt="delete-icon" className="mr-2" />
                 Delete
                </Button>
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
          <div className="applied-filter flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div><small>Applied Filter:</small></div>
              {appliedFilters.map((filter, i) => (
                <div key={i} className="filter-chip flex items-center ml-4">
                  <div><span>{filter?.displayName}</span></div>
                  <a onClick={() => removeFilter(i)}>
                    <img src="/assets/images/close-circle-icon.svg" alt="" className="ml-2 mt-1" />
                  </a>
                </div>
              ))}
            </div>
            <a onClick={removeAllFilters}>
              <div className="filter-chip blue-chip flex items-center">
                <div><span>Clear All ({appliedFilters.length})</span></div>
              </div>
            </a>
          </div>
        )}

        
        {uploads.length > 0 ? (

    <div
    className={`property-table overflow-x-auto relative ${
      appliedFilters.length > 0 ? "height-applied-filter" : ""
    } ${selectedUploads.size > 0 && appliedFilters.length > 0 ? "height-menu" : ""}`}
  >
    <table className="min-w-max w-full table-auto border-collapse">
      <thead className="sticky top-0 bg-white font-normal">
        <tr className="text-gray-500 font-normal text-md">
          <th className="px-4 py-2 font-normal">
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer"
              indeterminate={selectedUploads.size > 0 && selectedUploads.size < uploads.length}
              onChange={toggleSelectAll}
            />
          </th>
          <th className="px-4 py-2 font-normal">
            <div onClick={() => toggleSort("id")} className="flex items-center cursor-pointer group">
              Batch Id <span className="ml-1 opacity-0 group-hover:opacity-100">{getIcon("id") || <IoArrowDownOutline />}</span>
            </div>
          </th>
          <th className="px-4 py-2 font-normal">
            <div onClick={() => toggleSort("file_name")} className="flex items-center cursor-pointer group">
              File Name <span className="ml-1 opacity-0 group-hover:opacity-100">{getIcon("file_name") || <IoArrowDownOutline />}</span>
            </div>
          </th>
          <th className="px-4 py-2 font-normal">
            <div onClick={() => toggleSort("holder_name")} className="flex items-center cursor-pointer group">
              Holder Name <span className="ml-1 opacity-0 group-hover:opacity-100">{getIcon("holder_name") || <IoArrowDownOutline />}</span>
            </div>
          </th>
          <th className="px-4 py-2 font-normal">Records</th>
          <th className="px-4 py-2 font-normal">Succeed</th>
          <th className="px-4 py-2 font-normal">Failed</th>
          <th className="px-4 py-2 font-normal">
            <div onClick={() => toggleSort("import_date")} className="flex items-center cursor-pointer">
              Import Date <span className="ml-1">{getIcon("import_date") || getDefaultIcon("import_date")}</span>
            </div>
          </th>
          <th className="px-4 py-2 font-normal">User</th>
          <th className="px-4 py-2 font-normal">Status</th>
        </tr>
      </thead>
      <tbody>
        {uploads.map((element, index) => (
          <tr
            key={index}
            className={`border-none transition  duration-200 ease-in-out  ${
              selectedUploads.has(element.id) ? "bg-blue-100 bg-opacity-50" : "hover:bg-blue-100 hover:bg-opacity-50"
            }`}
          >
            <td className="px-4 py-3">
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                checked={selectedUploads.has(element.id)}
                onChange={() => toggleCheckbox(element.id)}
              />
            </td>
            <td className="px-4 py-3 text-black font-medium text-left">{element?.id}</td>
            <td className="px-4 py-3 text-gray-600 text-left">{element?.file_name}</td>
            <td className="px-4 py-3 text-gray-600 text-left">{element?.holder?.name}</td>
            <td className="px-4 py-3 text-gray-600 text-left">{element?.total_records}</td>
            <td className="px-4 py-3 text-gray-600">{element?.successful_records}</td>
            <td className="px-4 py-3 text-[#CB0000] text-left">{element?.failed_records}</td>
            <td className="px-4 py-3 text-gray-600 text-left">{new Date(element.created_at).toLocaleString()}</td>
            <td className="px-4 py-3 text-gray-600 text-left">{element?.uploader?.first_name} {element?.uploader?.last_name}</td>
            <td className="px-4 py-3 text-left">
              <span
                className={`px-2 py-1 rounded text-white ${
                  element.status === "FAILED" ? "text-[#CB0000] bg-blue-100 bg-opacity-50" : "text-[#3EA102] bg-blue-100 bg-opacity-50"
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
        ) : (
          <AppNoData
            title="No Uploads Available"
            subtitle="Upload any new file to display it here."
          />
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

// const AppAlertRecords = ({ isOpen, closeAlert }) => {
//  console.log("button clicked")
//   return null;
// };

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



