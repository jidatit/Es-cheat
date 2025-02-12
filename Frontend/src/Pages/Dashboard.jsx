


import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select, Button } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MdAdd } from "react-icons/md";
import ComplianceCalendarDialog from "../components/ComplianceCalendarDialog";


const Dashboard = () => {
  const [selectedHolder, setSelectedHolder] = useState("");
  const [holders, setHolders] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchHolders();
  }, []);

  const fetchHolders = async () => {
    try {
      const response = await getOrganizations();
      setHolders(response.data.organizations[0].holders);
    } catch (error) {
      console.error(error);
    }
  };

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
      start: 'prev,next', // Customize the prev and next buttons
      center: 'title',
      end: '' // Remove the "Today" button
    },
    events: [
      { title: "AX Report Due", date: "2024-10-05" },
      { title: "PA Report Due", date: "2024-10-07" },
      { title: "TX Report Due", date: "2024-10-09" },
      { title: "CT Report Due", date: "2024-10-17" },
      { title: "IL Report Due", date: "2024-11-20" },
      { title: "VT Report Due", date: "2024-12-30" }
    ],
    dateClick: handleDateClick
  };

  return (
    <div className="bg-white rounded-xl p-6 mr-[-8rem] overflow-x-hidden">
      <div className="">
      </div>
      <div className="summary-title flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Active Property Summary</h2>
        <div>
          <FormControl variant="outlined" sx={{ width: "200px", height: "40px" }}>
            <Select
              value={selectedHolder}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
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
              <MenuItem value="" disabled>
                Select Holder
              </MenuItem>
              {holders.map((holder, index) => (
                <MenuItem key={index} value={holder.name}>
                  {holder.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="card-container flex gap-4 ">
        <div className="card green-card p-2 rounded-lg w-72">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-gray-400">Total Properties</h6>
              <h1 className="font-semibold text-2xl text-left">$23,000</h1>
            </div>
            <div className="green-icon flex justify-center items-center p-5 rounded-md">
              <img src="assets/images/Square-chart-bar-icon.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="card blue-card rounded-lg w-72">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-gray-400 text-left">Total Amount</h6>
              <h1 className="font-semibold text-2xl">$ 232,738</h1>
            </div>
            <div className="icon-box blue-icon flex justify-center items-center p-5 rounded-lg">
              <img src="assets/images/Dollar-icon.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="card red-card rounded-lg w-72">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400">Total Owners</span>
              <p className="font-semibold text-2xl text-left">$23,890</p>
            </div>
            <div className="icon-box red-icon flex justify-center items-center p-5 rounded-lg">
              <img src="assets/images/tag-icon.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="card orange-card h-32 p-6 rounded-lg w-72">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400 text-left">Total States</span>
              <p className="font-semibold text-2xl text-left">$3144</p>
            </div>
            <div className="icon-box orange-icon flex justify-center items-center p-5 rounded-lg">
              <img src="assets/images/Building-icon.svg" alt="" />
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
            paddingRight: "1.5rem"
          }}
          variant="contained" color="primary" onClick={openDialog} className="flex items-center">
          <MdAdd className="mr-2" />
          Add
        </Button>
      </div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarOptions.events}
          dateClick={calendarOptions.dateClick}
          headerToolbar={{
            right: 'prev,next',
            left: 'title',
           
          }}
          buttonText={{
            prev: '<',
            next: '>',
          }}

          titleFormat={{ year: 'numeric', month: 'long' }}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' },
              dayHeaderFormat: { weekday: 'short' },
              dayHeaderClassNames: 'text-gray-500'

            }
          }}
         
        />
      </div>
      <ComplianceCalendarDialog open={dialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default Dashboard;






// import React, { useState, useEffect } from "react";
// import { FormControl, MenuItem, Select, Button } from "@mui/material";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { MdAdd } from "react-icons/md";
// import ComplianceCalendarDialog from "../components/ComplianceCalendarDialog";
// import { getOrganizations } from "./services/importModuleService"; // Import the service to get organizations

// const Dashboard = () => {
//   const [selectedHolder, setSelectedHolder] = useState("");
//   const [holders, setHolders] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   useEffect(() => {
//     fetchHolders();
//   }, []);

//   const fetchHolders = async () => {
//     try {
//       const response = await getOrganizations();
//       setHolders(response.data.organizations[0].holders);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event) => {
//     setSelectedHolder(event.target.value);
//   };

//   const openDialog = () => {
//     setDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setDialogOpen(false);
//   };

//   const handleDateClick = (arg) => {
//     alert("Date clicked: " + arg.dateStr);
//   };

//   const calendarOptions = {
//     plugins: [dayGridPlugin, interactionPlugin],
//     initialView: "dayGridMonth",
//     headerToolbar: {
//       start: "prev,next", // Customize the prev and next buttons
//       center: "title",
//       end: "" // Remove the "Today" button
//     },
//     events: [
//       { title: "AX Report Due", date: "2024-10-05" },
//       { title: "PA Report Due", date: "2024-10-07" },
//       { title: "TX Report Due", date: "2024-10-09" },
//       { title: "CT Report Due", date: "2024-10-17" },
//       { title: "IL Report Due", date: "2024-11-20" },
//       { title: "VT Report Due", date: "2024-12-30" }
//     ],
//     dateClick: handleDateClick,
//     buttonText: {
//       prev: "<",
//       next: ">"
//     },
//     titleFormat: { year: "numeric", month: "long" },
//     views: {
//       dayGridMonth: {
//         titleFormat: { year: "numeric", month: "long" },
//         dayHeaderFormat: { weekday: "short" },
//         dayHeaderClassNames: "text-gray-500"
//       }
//     },
//     customButtons: {
//       prev: {
//         text: "<",
//         click: () => {
//           // Custom click handler for prev button
//           document.querySelector(".fc-prev-button").click();
//         }
//       },
//       next: {
//         text: ">",
//         click: () => {
//           // Custom click handler for next button
//           document.querySelector(".fc-next-button").click();
//         }
//       }
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 overflow-x-hidden">
//       <link
//         href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/5.10.1/main.min.css"
//         rel="stylesheet"
//       />
//       <link
//         href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/5.10.1/daygrid.min.css"
//         rel="stylesheet"
//       />
//       <div className="summary-title flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Active Property Summary</h2>
//         <div>
//           <FormControl
//             variant="outlined"
//             sx={{ width: "200px", height: "40px" }}
//           >
//             <Select
//               value={selectedHolder}
//               onChange={handleChange}
//               displayEmpty
//               inputProps={{ "aria-label": "Without label" }}
//               sx={{
//                 height: "40px",
//                 padding: "4px",
//                 textAlign: "left",
//                 borderRadius: "5px",
//                 "& .MuiSelect-select": {
//                   paddingLeft: "10px",
//                   color: "gray"
//                 }
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Select Holder
//               </MenuItem>
//               {holders.map((holder, index) => (
//                 <MenuItem key={index} value={holder.name}>
//                   {holder.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//       </div>
//       <div className="card-container flex gap-4 mb-6">
//         <div className="card green-card p-2 rounded-lg w-72">
//           <div className="flex items-center justify-between">
//             <div>
//               <h6 className="text-gray-400">Total Properties</h6>
//               <h1 className="font-semibold text-2xl text-left">$23,000</h1>
//             </div>
//             <div className="green-icon flex justify-center items-center p-5 rounded-md">
//               <img src="assets/images/Square-chart-bar-icon.svg" alt="" />
//             </div>
//           </div>
//         </div>
//         <div className="card blue-card rounded-lg w-72">
//           <div className="flex items-center justify-between">
//             <div>
//               <h6 className="text-gray-400 text-left">Total Amount</h6>
//               <h1 className="font-semibold text-2xl">$ 232,738</h1>
//             </div>
//             <div className="icon-box blue-icon flex justify-center items-center p-5 rounded-lg">
//               <img src="assets/images/Dollar-icon.svg" alt="" />
//             </div>
//           </div>
//         </div>
//         <div className="card red-card rounded-lg w-72">
//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-gray-400">Total Owners</span>
//               <p className="font-semibold text-2xl text-left">$23,890</p>
//             </div>
//             <div className="icon-box red-icon flex justify-center items-center p-5 rounded-lg">
//               <img src="assets/images/tag-icon.svg" alt="" />
//             </div>
//           </div>
//         </div>
//         <div className="card orange-card h-32 p-6 rounded-lg w-72">
//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-gray-400 text-left">Total States</span>
//               <p className="font-semibold text-2xl text-left">$3144</p>
//             </div>
//             <div className="icon-box orange-icon flex justify-center items-center p-5 rounded-lg">
//               <img src="assets/images/Building-icon.svg" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end py-3">
//         <Button
//           sx={{
//             textTransform: "none",
//             fontSize: "1rem",
//             borderRadius: "10px",
//             paddingLeft: "1.5rem",
//             paddingRight: "1.5rem"
//           }}
//           variant="contained"
//           color="primary"
//           onClick={openDialog}
//           className="flex items-center"
//         >
//           <MdAdd className="mr-2" />
//           Add
//         </Button>
//       </div>
//       <div className="calendar-container">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={calendarOptions.events}
//           dateClick={calendarOptions.dateClick}
//           headerToolbar={{
//             left: "",
//             center: "prev,title,next",
//             right: ""
//           }}
//           buttonText={{
//             prev: "<",
//             next: ">"
//           }}
//           customButtons={{
//             prev: {
//               text: "<",
//               click: () => {
//                 document.querySelector(".fc-prev-button").click();
//               }
//             },
//             next: {
//               text: ">",
//               click: () => {
//                 document.querySelector(".fc-next-button").click();
//               }
//             }
//           }}
//           titleFormat={{ year: "numeric", month: "long" }}
//           views={{
//             dayGridMonth: {
//               titleFormat: { year: "numeric", month: "long" },
//               dayHeaderFormat: { weekday: "short" },
//               dayHeaderClassNames: "text-gray-500"
//             }
//           }}
//           height="auto"
//           contentHeight="auto"
//         />
//       </div>
//       <ComplianceCalendarDialog open={dialogOpen} onClose={closeDialog} />
//     </div>
//   );
// };

// export default Dashboard;














