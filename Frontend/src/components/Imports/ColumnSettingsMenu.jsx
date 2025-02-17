import { Button } from "@mui/material";
import React, { useRef, useEffect } from "react";

const ColumnSettingsMenu = ({
  isOpen,
  columnList,
  toggleColumn,
  onApplyClick,
  onCloseMenu,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const button = document.querySelector(".column-filter-btn");
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
          scrollbarWidth: "thin",
          scrollbarColor: "#6C6C6C #6C6C6C",
        }}
      >
        {columnList.map((column, i) => (
          <li
            key={i}
            className={`flex items-center cursor-pointer ${
              column.isDisabled ? "cursor-not-allowed" : ""
            } font-semibold text-black relative group text-sm`}
            onClick={() => !column.isDisabled && toggleColumn(column)}
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={column.checked}
                disabled={column.isDisabled}
                className={`mr-2 mt-1.5 ${
                  column.isDisabled ? "opacity-50" : ""
                }`}
                style={{ width: "15px", height: "15px" }}
              />
              {/* {column.isDisabled && (
                <div className="absolute inset-0 hidden group-hover:flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-500"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M6 6L14 14M14 6L6 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )} */}
            </div>
            <span className={column.isDisabled ? "text-gray-500 text-sm" : ""}>
              {column.name}
              {column.mandatory && (
                <span className="ml-1 text-xs text-red-500">(Required)</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="pt-4 pb-4 border-t flex justify-start items-left">
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
