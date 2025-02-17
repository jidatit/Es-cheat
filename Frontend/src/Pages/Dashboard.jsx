import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select, Button } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MdAdd } from "react-icons/md";
import ComplianceCalendarDialog from "../components/ComplianceCalendarDialog";
import barIcon from "../assets/images/Square-chart-bar-icon.svg";
import dollarIcon from "../assets/images/Dollar-icon.svg";
import tagIcon from "../assets/images/tag-icon.svg";
import buildingIcon from "../assets/images/Building-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizations } from "../redux/Actions/UserSignin";
const Dashboard = ({ isSidebarOpened }) => {
  const [selectedHolder, setSelectedHolder] = useState("");
  const { organizations, isLoadingOrganizations } = useSelector(
    (state) => state.UserAuthentication
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [holders, setHolders] = useState([]);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (organizations.length > 0) {
      const extractedHolders = organizations.flatMap((org) =>
        org.holders.map((holder) => ({ id: holder.id, name: holder.name }))
      );
      setHolders(extractedHolders);

      // Set default selected holder if available
      if (extractedHolders.length > 0) {
        setSelectedHolder(extractedHolders[0].id);
      } else {
        setSelectedHolder(""); // Reset selection if no holders
      }
    }
  }, [organizations]);

  const handleChange = (event) => {
    setSelectedHolder(event.target.value);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleDateClick = (arg) => {
    alert("Date clicked: " + arg.dateStr);
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "prev,next", // Customize the prev and next buttons
      center: "title",
      end: "", // Remove the "Today" button
    },
    events: [
      { title: "AX Report Due", date: "2024-10-05" },
      { title: "PA Report Due", date: "2024-10-07" },
      { title: "TX Report Due", date: "2024-10-09" },
      { title: "CT Report Due", date: "2024-10-17" },
      { title: "IL Report Due", date: "2024-11-20" },
      { title: "VT Report Due", date: "2024-12-30" },
    ],
    dateClick: handleDateClick,
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">Dashboard</h1>
        {/* Other header elements */}
      </div>
      <div className={`bg-white rounded-xl transition-all duration-300 p-4`}>
        <div className="summary-title flex justify-between items-center mb-6 w-full">
          <h2 className="text-2xl font-semibold">Active Property Summary</h2>
          <div>
            {holders.length > 0 ? (
              <FormControl
                variant="outlined"
                sx={{ width: "200px", height: "40px" }}
              >
                <Select
                  value={selectedHolder}
                  onChange={handleChange}
                  sx={{
                    height: "40px",
                    padding: "4px",
                    textAlign: "left",
                    borderRadius: "5px",
                    "& .MuiSelect-select": {
                      paddingLeft: "10px",
                      color: "gray",
                    },
                  }}
                >
                  {holders.map((holder) => (
                    <MenuItem key={holder.id} value={holder.id}>
                      {holder.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <span className="text-gray-500 text-sm">No Holder</span>
            )}
          </div>
        </div>

        <div className="card-container flex gap-4 ">
          <div className="card green-card p-2 rounded-lg w-[33%]">
            <div className="flex items-center justify-between">
              <div>
                <h6 className="text-gray-400">Total Properties</h6>
                <h1 className="font-semibold text-2xl text-left">$23,000</h1>
              </div>
              <div className="green-icon flex justify-center items-center p-2 rounded-md">
                <img src={barIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="card blue-card rounded-lg w-[33%]">
            <div className="flex items-center justify-between">
              <div>
                <h6 className="text-gray-400 text-left">Total Amount</h6>
                <h1 className="font-semibold text-2xl">$ 232,738</h1>
              </div>
              <div className="icon-box blue-icon flex justify-center items-center p-2 rounded-lg">
                <img src={dollarIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="card red-card rounded-lg w-[33%]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400">Total Owners</span>
                <p className="font-semibold text-2xl text-left">$23,890</p>
              </div>
              <div className="icon-box red-icon flex justify-center items-center p-2 rounded-lg">
                <img src={tagIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="card orange-card h-32 p-6 rounded-lg w-[33%]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-left">Total States</span>
                <p className="font-semibold text-2xl text-left">$3144</p>
              </div>
              <div className="icon-box orange-icon flex justify-center items-center p-2 rounded-lg">
                <img src={buildingIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end py-3">
          <Button
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "10px",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
            variant="contained"
            color="primary"
            onClick={openDialog}
            className="flex items-center"
          >
            <MdAdd className="mr-2" />
            Add
          </Button>
        </div>
        <div className="calendar-container w-full">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarOptions.events}
            dateClick={calendarOptions.dateClick}
            headerToolbar={{
              right: "prev,next",
              left: "title",
            }}
            buttonText={{
              prev: "<",
              next: ">",
            }}
            titleFormat={{ year: "numeric", month: "long" }}
            views={{
              dayGridMonth: {
                titleFormat: { year: "numeric", month: "long" },
                dayHeaderFormat: { weekday: "short" },
                dayHeaderClassNames: "text-gray-500",
              },
            }}
          />
        </div>
        <ComplianceCalendarDialog open={dialogOpen} onClose={closeDialog} />
      </div>
    </div>
  );
};

export default Dashboard;
