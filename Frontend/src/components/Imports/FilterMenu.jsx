import React, { useState, useRef, useEffect } from "react";
import closeIcon from "../../assets/images/close-icon.svg";
import { Button } from "@mui/material";

const FilterMenu = ({ isOpen, onClose, onApplyFilter, holdersList }) => {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedHolder, setSelectedHolder] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const button = document.querySelector(".filtermenu-btn");
      if (button) {
        const rect = button.getBoundingClientRect();
        menuRef.current.style.top = `${rect.bottom + 5}px`;
        menuRef.current.style.left = `${rect.left}px`;
      }
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const resetFilterForm = () => {
    setDateRange({ from: "", to: "" });
    setSelectedHolder("");
  };

  return (
    <div
      ref={menuRef}
      className="fixed  w-[25%] bg-white border rounded shadow-lg p-4 z-10"
    >
      <div className="filter-menu__header flex justify-between items-center p-4 border-b">
        <div>
          <b>Filter</b>
        </div>
        <a onClick={onClose} className="cursor-pointer">
          <img src={closeIcon} alt="close-icon" />
        </a>
      </div>
      <div className="filter-menu__body py-4">
        <div className="row flex mb-4">
          <div className="w-[50%]  mb-4">
            <label className="">From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange({ ...dateRange, from: e.target.value })
              }
              className="mt-2 p-2 border rounded w-full"
            />
          </div>
          <div className=" w-[50%] col-6 pl-2">
            <div className="form-control mb-4">
              <label>To</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
                className="mt-2 p-2 border rounded w-full"
              />
            </div>
          </div>
        </div>
        <div className="form-control mb-4">
          <div className="flex justify-between items-center mb-2 ">
            <label>Holder</label>
            {selectedHolder && (
              <a
                className="clear-btn text-blue-500 text-sm cursor-pointer"
                onClick={() => setSelectedHolder("")}
              >
                Clear
              </a>
            )}
          </div>
          <select
            value={selectedHolder}
            onChange={(e) => setSelectedHolder(e.target.value)}
            className="mt-2 p-3 border rounded-lg w-full"
          >
            <option value="">Select Holder</option>
            {holdersList.map((holder, i) => (
              <option key={i} value={holder.name}>
                {holder.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=" p-4 border-t flex justify-start items-center">
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
          onClick={() => onApplyFilter(dateRange, selectedHolder)}
        >
          Apply
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
          onClick={resetFilterForm}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterMenu;
