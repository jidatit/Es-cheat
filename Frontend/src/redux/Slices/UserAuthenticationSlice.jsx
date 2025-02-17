import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  organizations: [],
  holders: [],
  uploads: [],
  filteredUploads: [],
  properties: [],
  isLoadingOrganizations: false,
  isLoadingUploads: false,
  isLoadingFilteredUploads: false,
  isLoadingProperties: false,
  isUploadingFile: false, // Add a new state to track file upload
  isLoadingHolders: false, // Track loading state for holders
  isDeleting: false,
  deleteError: null,
};

const UserAuthenticationSlice = createSlice({
  name: "UserAuthentication",
  initialState,
  reducers: {
    // Authentication Actions
    UserSignInRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    UserSigninSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    UserSignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UserLogout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },

    // Organization Holders
    FetchOrganizationsRequest: (state) => {
      state.isLoadingOrganizations = true;
    },
    FetchOrganizationsSuccess: (state, action) => {
      state.isLoadingOrganizations = false;
      state.organizations = action.payload;
      // Extract holders from organizations and store in state
      state.holders = action.payload.flatMap((org) =>
        org.holders.map((holder) => ({ id: holder.id, name: holder.name }))
      );
    },
    FetchOrganizationsFailure: (state, action) => {
      state.isLoadingOrganizations = false;
      state.error = action.payload;
    },
    UpdateHolders: (state, action) => {
      state.holders = action.payload;
    },
    // Uploads Data
    FetchUploadsRequest: (state) => {
      state.isLoadingUploads = true;
    },
    FetchUploadsSuccess: (state, action) => {
      state.isLoadingUploads = false;
      state.uploads = action.payload;
    },
    FetchUploadsFailure: (state, action) => {
      state.isLoadingUploads = false;
      state.error = action.payload;
    },

    // Filtered Uploads Data
    FetchFilteredUploadsRequest: (state) => {
      state.isLoadingFilteredUploads = true;
    },
    FetchFilteredUploadsSuccess: (state, action) => {
      state.isLoadingFilteredUploads = false;
      state.filteredUploads = action.payload;
    },
    FetchFilteredUploadsFailure: (state, action) => {
      state.isLoadingFilteredUploads = false;
      state.error = action.payload;
    },

    // Properties Data
    FetchPropertiesRequest: (state) => {
      state.isLoadingProperties = true;
      state.uploads = []; // Reset uploads state when fetching properties
    },
    FetchPropertiesSuccess: (state, action) => {
      state.isLoadingProperties = false;
      state.properties = action.payload;
    },
    FetchPropertiesFailure: (state, action) => {
      state.isLoadingProperties = false;
      state.error = action.payload;
    },
    FetchUploadRecordsRequest: (state) => {
      state.properties = [];
      state.isLoadingUploads = true;
    },
    FetchUploadRecordsSuccess: (state, action) => {
      state.isLoadingUploads = false;
      state.properties = action.payload.records; // Store properties from response
    },

    FetchUploadRecordsFailure: (state, action) => {
      state.isLoadingUploads = false;
      state.error = action.payload;
    },
    // File Upload Actions
    FileUploadRequest: (state) => {
      state.isUploadingFile = true;
      state.error = null;
      state.uploads = []; // Reset uploads state when uploading a file
    },
    FileUploadSuccess: (state, action) => {
      state.isUploadingFile = false;
      state.uploads.push(action.payload); // Add the new upload to the state
    },
    FileUploadFailure: (state, action) => {
      state.isUploadingFile = false;
      state.error = action.payload;
    },
    // Reset State
    ResetState: (state) => {
      Object.assign(state, initialState);
    },
    ResetPropertiesState: (state) => {
      state.properties = [];
    },
    ResetUploadState: (state) => {
      state.uploads = [];
    },
    DeletePropertiesRequest: (state) => {
      state.isDeleting = true;
      state.deleteError = null;
    },
    DeletePropertiesSuccess: (state) => {
      state.isDeleting = false;
    },
    DeletePropertiesFailure: (state, action) => {
      state.isDeleting = false;
      state.deleteError = action.payload;
    },
  },
});

export const {
  UserSignInRequest,
  UserSigninSuccess,
  UserSignInFailure,
  UserLogout,
  FetchOrganizationsRequest,
  FetchOrganizationsSuccess,
  FetchOrganizationsFailure,
  FetchUploadsRequest,
  ResetPropertiesState,
  FetchUploadsSuccess,
  FetchUploadsFailure,
  FetchFilteredUploadsRequest,
  FetchFilteredUploadsSuccess,
  FetchFilteredUploadsFailure,
  FetchPropertiesRequest,
  ResetUploadState,
  FetchPropertiesSuccess,
  FetchUploadRecordsFailure,
  FetchUploadRecordsRequest,
  FetchUploadRecordsSuccess,
  FetchPropertiesFailure,
  DeletePropertiesFailure,
  DeletePropertiesRequest,
  DeletePropertiesSuccess,
  UpdateHolders,
  FileUploadRequest,
  FileUploadSuccess,
  FileUploadFailure,
  ResetState,
} = UserAuthenticationSlice.actions;

export default UserAuthenticationSlice;
