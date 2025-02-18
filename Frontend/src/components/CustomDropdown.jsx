import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { IoMdArrowDropdown } from "react-icons/io";

const CustomDropdown = ({
  label,
  value,
  options,
  onChange,
  disabled,
  isLoading,
  placeholder,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!disabled) setAnchorEl(event.currentTarget);
  };

  const handleClose = (optionValue) => {
    setAnchorEl(null);
    if (optionValue) onChange(optionValue);
  };

  return (
    <div className="relative w-56">
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<IoMdArrowDropdown />}
        disabled={disabled}
        className="w-full text-left justify-between"
      >
        {isLoading
          ? "Loading..."
          : value
          ? options.find((opt) => opt.id === value)?.name
          : placeholder}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        TransitionComponent={Fade}
      >
        {isLoading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : options.length > 0 ? (
          options.map((option) => (
            <MenuItem key={option.id} onClick={() => handleClose(option.id)}>
              {option.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No options available</MenuItem>
        )}
      </Menu>
    </div>
  );
};
export default CustomDropdown;
