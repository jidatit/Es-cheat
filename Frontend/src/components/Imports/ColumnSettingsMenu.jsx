
import { Button } from '@mui/material';
import React, { useRef, useEffect } from 'react';

const ColumnSettingsMenu = ({ isOpen, columnList, toggleColumn, onApplyClick, onCloseMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const button = document.querySelector('.column-filter-btn');
      if (button) {
        const rect = button.getBoundingClientRect();
        menuRef.current.style.top = `${rect.bottom + 5}px`; 
        menuRef.current.style.left = `${rect.left}px`;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className=" fixed bg-white border rounded pl-4 pt-4"
      style={{ zIndex: 1000 }}
    >

<ul
  style={{
    maxHeight: "300px",
    overflowY: "auto",
    width: "230px",
  }}
  className="custom-scrollbar"
>


        {columnList.map((column, i) => (
          <li
            key={i}
            className={`flex items-center cursor-pointer ${column.isDisabled ? 'cursor-not-allowed' : ''} font-semibold text-black`}
            onClick={() => !column.isDisabled && toggleColumn(column)}
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={column.checked}
              disabled={column.isDisabled}
              className="mr-2"
              style={{ width: '20px', height: '20px' }}
            />
            {column.name}
          </li>
        ))}
      </ul>

      <div className="pt-4 pb-4 border-t flex justify-start items-left">
        <Button
          sx={{
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '10px',
            padding: '8px 25px',
            marginRight: '8px',
            textTransform:"none",
            fontSize:"1rem",
            
            '&:hover': {
              backgroundColor: '#0056b3' 
            }
          }}
          onClick={onApplyClick}
        >
          Apply
        </Button>
        <Button
          sx={{
            backgroundColor: "transparent",
            color: "gray",
            borderRadius: "10px",
            padding: "8px 25px",
            textTransform: "none",
            border: "1px solid gray",
            transition: "all 0.3s ease-in-out",
            fontSize:"1rem",
            "&:hover, &:focus": {
              backgroundColor: "#f0f0f0",
              border: "1px solid #007bff",
              color: "#007bff",

            },
            "&:hover svg path, &:focus svg path": {
              stroke: "#007bff",
            },
          }}
          onClick={onCloseMenu}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ColumnSettingsMenu;
