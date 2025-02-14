import React from 'react';
import editIcon from '../assets/images/edit-icon.png';
import closeIcon from '../assets/images/close-icon.svg';
import plusSign from '../assets/images/plus-blue.svg';
import fileIcon from '../assets/images/File-icon.svg';

const Details = ({ isOpen, propertyData, close }) => {
  if (!isOpen) return null;

  const styles = {
    hideScrollbar: {
      scrollbarWidth: 'none', /* Firefox */
      msOverflowStyle: 'none',  /* IE and Edge */
    },
    hideScrollbarWebkit: {
      overflowY: 'auto',
      scrollbarWidth: 'none', /* Firefox */
      msOverflowStyle: 'none', /* IE and Edge */
    },
    hideScrollbarWebkitInner: {
      overflowY: 'auto',
      scrollbarWidth: 'none', /* Firefox */
      msOverflowStyle: 'none', /* IE and Edge */
      '&::-webkit-scrollbar': {
        display: 'none', /* Chrome, Safari and Opera */
      },
    }
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 z-[111] bg-white shadow-lg w-[32.7rem]">
      <div className="h-screen overflow-y-auto p-6 custom-scrollbar" style={{ ...styles.hideScrollbar, ...styles.hideScrollbarWebkitInner }}>
        <div className="flex justify-between items-center pb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-x-2">
            Owner Details
            <a title={"PROPERTIES.EDIT_TOOLTIP"} className="ml-1">
              <img src={editIcon} width="14" alt="edit" />
            </a>
          </h2>
          <img
            className="cursor-pointer"
            src={closeIcon}
            alt="close-icon"
            onClick={close}
          />
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center pb-8 gap-6">
            <div>
              <span className="text-gray-500 font-medium text-sm">Owner Name</span>
              <p className="font-medium text-base">{propertyData.first_name} {propertyData.last_name}</p>
            </div>
          </div>
          <div className="flex items-center pb-0 gap-6">
            <div>
              <span className="text-gray-500 font-medium text-sm">Address</span>
              <p className="font-medium text-base">
                {propertyData.street_address_1}
                {propertyData.street_address_2} {propertyData.city}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-x-2 text-left">
            Property Details
            <a title="Edit" className="ml-1">
              <img src={editIcon} width="14" alt="edit" />
            </a>
          </h2>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center pb-8 gap-6">
            <div className="w-1/2">
              <span className="text-gray-500 font-medium text-sm">Type</span>
              <p className="font-medium text-base">{propertyData.property_type}</p>
            </div>
            <div className="w-1/2">
              <span className="text-gray-500 font-medium text-sm">Balance</span>
              <p className="font-medium text-base text-green-500">{propertyData.amount}</p>
            </div>
          </div>
          <div className="flex items-center pb-0 gap-6">
            <div className="w-1/2">
              <span className="text-gray-500 font-medium text-sm">Last Activity Date</span>
              <p className="font-medium text-base">{propertyData.date_of_last_contact}</p>
            </div>
            <div className="w-1/2">
              <span className="text-gray-500 font-medium text-sm">Check</span>
              <p className="font-medium text-base">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex gap-x-2 items-center text-left">
            Documents
            <a title={"PROPERTIES.ADD_TOOLTIP"} className="ml-1">
              <img src={plusSign} width="14" alt="add" />
            </a>
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
              <div className="p-2 bg-blue-100 rounded-md">
                <img
                  src={fileIcon}
                  alt="file-icon"
                />
              </div>
              <small className="text-gray-500 font-medium text-sm">Saving Account.pdf</small>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
              <div className="p-2 bg-blue-100 rounded-md">
                <img
                  src={fileIcon}
                  alt="file-icon"
                />
              </div>
              <small className="text-gray-500 font-medium text-sm">Amount Deposit.pdf</small>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-left">Log</h2>
          <div className="flex justify-between items-center text-sm font-medium py-3 border-b">
            <span className="text-gray-700">Notification Sent</span>
            <span className="text-gray-500">01/23/24</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium py-3 border-b">
            <span className="text-gray-700">Claim Started</span>
            <span className="text-gray-500">02/15/24</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium py-3 border-b">
            <span className="text-gray-700">Documents Received</span>
            <span className="text-gray-500">02/15/24</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium py-3 border-b">
            <span className="text-gray-700">Claim Resolved</span>
            <span className="text-gray-500">02/17/24</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium py-3 border-b">
            <span className="text-gray-700">Documents Validated</span>
            <span className="text-gray-500">04/17/24</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;