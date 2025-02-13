import React from 'react';
import closeIcon from '../assets/images/close-icon.svg';
import deletePopupIcon from '../assets/images/delete-popup-icon.svg';
import { Button } from '@mui/material';

const DeleteDialog = ({ data, subtitle, close, onConfirmClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-end">
        <img
          onClick={close}
          className="cursor-pointer"
          src={closeIcon}
          alt="close-icon"
        />
      </div>
      <form className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mt-8 flex items-center justify-center">
            <img src={deletePopupIcon} alt="delete-popup-icon" />
          </div>
          <div className="mt-8 text-center">
            <div className="text-lg   font-bold">Are you sure you want to delete?</div>
            {data.title === 'import' && (
              <>
                {data.uploadIds.length > 1 ? (
                  <div className="text-sm mt-2">{subtitle}</div>
                ) : (
                  <div className="text-sm mt-2">
                    This action will delete all the records for batch <b>{data.uploadIds[0]}</b>
                  </div>
                )}
              </>
            )}
            {data.title === 'property' && (
              <>
                {data.propertyIds.length > 1 ? (
                  <div className="text-sm mt-2">{subtitle}</div>
                ) : (
                  <div className="text-sm mt-2 ">
                    This action will delete all the records for batch <b>{data.propertyIds[0]}</b>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center ">
         
            <Button
        
        sx={{
          backgroundColor: '#007bff', 
          color: 'white',
          borderRadius: '10px',
          padding: '8px 25px',
          marginRight: '8px',
          textTransform:"none",

          '&:hover': {
            backgroundColor: '#0056b3' 
          }
        }}
        onClick={onConfirmClick}
      >
        Confirm
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
        onClick={close}
      >
        Cancel
      </Button>
        </div>
      </form>
    </div>
  );
};

export default DeleteDialog;