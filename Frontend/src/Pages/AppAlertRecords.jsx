
import React from 'react';
import closeIcon from "../assets/images/close-icon.svg"

const AppAlertRecords = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-[32rem] h-screen bg-white border border-gray-200 z-[111]">
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
        <div><b className="text-black text-2xl font-semibold leading-6">Alerts</b></div>
        <a onClick={onClose} className="cursor-pointer">
          <img src={closeIcon} alt="hello" />
        </a>
      </div>
      <div className="h-[calc(100vh-5.7rem)] p-6 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <div><small className="text-black text-lg font-semibold leading-5">5 in total</small></div>
          <div><a className="text-blue-500 text-base font-semibold leading-5 cursor-pointer">Clear all</a></div>
        </div>
        <div>
          <div className="text-black  flex   text-base font-semibold leading-5 my-1">Today</div>
          <ul>
            <AlertNotification />
            <AlertNotification />
            <AlertNotification />
          </ul>
        </div>
        <div>
          <div className="text-black text-base flex  font-semibold leading-5 my-1">Yesterday</div>
          <ul>
            <AlertNotification />
            <AlertNotification />
            <AlertNotification />
          </ul>
        </div>
      </div>
    </div>
  );
};

const AlertNotification = () => (
  <li className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-4">
    <div className="flex justify-between items-center">
      <div><span className="text-black text-base font-semibold leading-5">22-nov-records.csv</span></div>
      <div><small className="text-gray-500 text-sm font-medium leading-4">4h ago</small></div>
    </div>
    <ul>
      <li className="flex justify-start items-center mt-1">
        <div className="bg-gray-500 rounded-full h-1.5 w-1.5 mx-2"></div>
        <div className="text-gray-500 text-sm font-semibold leading-5">
          <small className="text-red-600">3 files</small> failed during upload.
        </div>
      </li>
      <li className="flex justify-start items-center mt-1">
        <div className="bg-gray-500 rounded-full h-1.5 w-1.5 mx-2"></div>
        <div className="text-gray-500 text-sm font-semibold leading-5">
          <small className="text-green-700">12 files</small> are imported successfully.
        </div>
      </li>
    </ul>
  </li>
);

export default AppAlertRecords;
