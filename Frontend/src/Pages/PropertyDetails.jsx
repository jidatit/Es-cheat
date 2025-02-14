import React, { useState,useEffect } from 'react';
// import PropertyExpansionPanel from './PropertyExpansionPanel';
import Details from '../components/Details';
import plusIcon from '../assets/images/plus-icon.svg';
import searchIcon from '../assets/images/search-icon.svg';
import trashIcon from '../assets/images/trash-icon.svg';
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from '@mui/material';
import DeleteDialog from '../components/DeleteDialog';
const Properties = ({  holders, uploads, isLoading, isHoldersLoading, isUploadsLoading }) => {
  const [holder, setHolder] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [searchControl, setSearchControl] = useState('');
  const [isExpansionPanelOpen, setExpansionPanelOpen] = useState(false);
  const [property, setProperty] = useState(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState({ title: '', uploadIds: [], propertyIds: [] });
    const [subtitle, setSubtitle] = useState('');
    const [properties, setProperties] = useState([
  {
         id:1,
         first_name :  'saba',
        last_name:'imtiaz',
         property_type: 'ssss',
         amount: 2,
        status: "SUCCESS" ,
          state: "fl",
           date_of_last_contact: "11/15/2023",
  },
  {
    id:2,
    first_name :  'sa444a',
   last_name:'imti444444z',
    property_type: 's444ss',
    amount: 4,
   status: "SUCCESS" ,
     state: "fl",
      date_of_last_contact: "18/15/2023",
}
    ]);
  const selectHolder = (holder) => setHolder(holder);
  const selectUpload = (upload) => setSelectedUpload(upload);
  const [selectedProperties, setSelectedProperties] = useState(new Set());
  

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

const toggleSelectAll = () => {
  setSelectedProperties((prevSelected) => {
    if (prevSelected.size === properties.length) {
      return new Set(); // Deselect all
    } else {
      return new Set(properties.map((item) => item.id)); // Select all IDs
    }
  });
};
useEffect(() => {
  const selectAllCheckbox = document.querySelector("thead input[type='checkbox']");
  if (selectAllCheckbox) {
    selectAllCheckbox.indeterminate = selectedProperties.size > 0 && selectedProperties.size < properties.length;
    selectAllCheckbox.checked = selectedProperties.size === properties.length;
  }
}, [selectedProperties, properties.length]);

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

  const onScrolledDown = () => {
    // Implementation for infinite scroll
  };
  const openExpansionPanel = (property) => {
    setProperty(property);
    setExpansionPanelOpen(true);
  };
  useEffect(() => {
    const selectAllCheckbox = document.querySelector("thead input[type='checkbox']");
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate = selectedProperties.size > 0 && selectedProperties.size < properties.length;
    }
  }, [selectedProperties, properties.length]);
  return (
    <div>
     <div className=" flex justify-between items-center gap-[3.2rem] mb-[2.4rem]">
     <h1 class="font-semibold text-2xl leading-7 w-1/10">Properties</h1>
     <div className="flex flex-wrap items-center gap-4 p-4 b ">
  {/* Holder Dropdown */}
  <div className="relative w-56">
    <div className="relative">
      <select
        value={holder}
        onChange={(e) => selectHolder(e.target.value)}
        disabled={isHoldersLoading}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none bg-white cursor-pointer appearance-none"
      >
        <option value="" >
          {isHoldersLoading ? "Loading..." : "Holder 3"}
        </option>
        <option value="" >
          {isHoldersLoading ? "Loading..." : "Holder 4"}
        </option>
        {holders?.length > 0 &&
          holders.map((holder, index) => (
            <option value={holder.id} key={index}>
              {holder.name}
            </option>
          ))}
      </select>
      {/* Dropdown Icon */}
      <IoMdArrowDropdown className="absolute right-3 top-3 text-gray-900 pointer-events-none" size={20} />
    </div>
  </div>

  {/* Upload Dropdown */}
  <div className="relative w-[20rem]">
    <div className="relative">
      <select
        value={selectedUpload}
        onChange={(e) => selectUpload(e.target.value)}
        disabled={isUploadsLoading}
        className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none bg-white cursor-pointer appearance-none"
      >
        <option value="" >
          {isUploadsLoading ? "Loading..." : "File 1 "}
        </option>
        <option value="" >
          {isUploadsLoading ? "Loading..." : "File 2 "}
        </option>
        {uploads?.length > 0 &&
          uploads.map((file, index) => (
            <option value={file.id} key={index}>
              {file.file_name}
            </option>
          ))}
      </select>
      {/* Dropdown Icon */}
      <IoMdArrowDropdown className="absolute right-3 top-3 text-gray-900 pointer-events-none" size={20} />
    </div>
  </div>
</div>
      </div>
      <div className="bg-white rounded-lg">
        <div className=" flex justify-between items-center mb-9">
          <div className="flex gap=[1.2rem] items-center">
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
                marginRight:"0.5rem",
            
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

 <div className="relative  ml-[0.5rem] flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white w-[20rem]">
  {/* Search Button */}
  <button className="mr-2">
    <img src={searchIcon} alt="search" className="w-5 h-5" />
  </button>

  {/* Search Input */}
  <input
    type="text"
    value={searchControl}
    onChange={(e) => setSearchControl(e.target.value)}
    placeholder="Search keyword"
    className="w-full outline-none bg-transparent"
  />

  {/* Slash Shortcut Indicator */}
  <div className="absolute right-2 flex justify-center items-center w-5 h-5 border border-gray-200 rounded-md text-gray-500 text-sm bg-gray-100">
    /
  </div>
</div>
          </div>

          <div className="flex items-center gap-x-4">
  {selectedProperties.size > 0 && (
    <div className="selected-row flex items-center">
      <span>{selectedProperties.size} Selected</span>
      <button className="flex items-center ml-4" onClick={() => openDeleteDialogue('import', { uploadIds: [1, 2, 3] })}>
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

        <div
          className="property-table"
          onScroll={onScrolledDown}
        >
          {properties.length > 0 ? (
          <div className="overflow-x-auto relative ">
            <table className="min-w-max w-full table-auto border-collapse">
              <thead  className="sticky top-0 bg-white font-normal" >
                <tr className="text-gray-500 font-normal text-md">
                  <th className="px-4 py-2 font-normal" >
                    <input
                      type="checkbox"
                       className="w-5 h-5 cursor-pointer"
                       indeterminate={selectedProperties.size > 0 && selectedProperties.size < properties.length}
                       onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-2 font-normal">First Name</th>
                  <th className="px-4 py-2 font-normal">Last Name</th>
                  <th className="px-4 py-2 font-normal">Property Type</th>
                  <th className="px-4 py-2 font-normal">Balance</th>
                  <th className="px-4 py-2 font-normal">Letter Required</th>
                  <th className="px-4 py-2 font-normal">Email Required</th>
                  <th className="px-4 py-2 font-normal">State</th>
                  <th className="px-4 py-2 font-normal">Report Due</th>
                  <th className="px-4 py-2 font-normal">Last Activity</th>
                  <th className="px-4 py-2 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                 {properties.map((element,index) => ( 
                  <tr
                    key={element.id}
                    className={`cursor-pointer
                       transition  duration-200 ease-in-out
                       ${selectedProperties.has(element.id) ? 'bg-blue-100 bg-opacity-50' : "hover:bg-blue-100 hover:bg-opacity-50"}`}
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
                    <td className="px-4 py-3 text-black font-medium text-left">{element?.first_name}</td>
                    <td className="px-4 py-3 text-black font-medium text-left">{element?.last_name}</td>
                    <td className="px-4 py-3 text-gray-600 text-left"  >{element?.property_type}</td>
                    <td className="px-4 py-3 text-gray-600 text-left">{element?.amount}</td>
                    <td className="px-4 py-3 text-gray-600 text-left">Yes</td>
                    <td className="px-4 py-3 text-gray-600 text-left">No</td>
                    <td className="px-4 py-3 text-gray-600 text-left">{element?.state}</td>
                    <td className="px-4 py-3 text-gray-600 text-left">04/18/24</td>
                    <td className="px-4 py-3 text-gray-600 text-left">{new Date(element?.date_of_last_contact).toLocaleDateString()}</td>
                    <td className="px-4 py-3  text-left">
                      <span className={`px-2 py-1 rounded text-white ${element?.status === 'FAILED' ? "text-[#CB0000] bg-blue-100 bg-opacity-50"  : "text-[#3EA102] bg-blue-100 bg-opacity-50" }`}>
                        {element?.status}
                      </span>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
         ) : (
            !isLoading && (
              <div className="text-center text-gray-400 font-normal">
              <h2 className='font-bold'>No Properties Available</h2>
                <p >Create any new property to display it here.</p>
              </div>
            )
          )}
        </div>
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












