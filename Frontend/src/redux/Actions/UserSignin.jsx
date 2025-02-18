import { toast } from "sonner";
import {
  deleteUploadAPI,
  fetchOrganizationsAPI,
  fetchUploadRecordsAPI,
  fetchUploadsAPI,
  uploadFileAPI,
  userSignAPI,
} from "../Api'sFunctions/UserSignin";
import {
  DeletePropertiesFailure,
  DeletePropertiesRequest,
  DeletePropertiesSuccess,
  FetchFilteredUploadsFailure,
  FetchFilteredUploadsRequest,
  FetchFilteredUploadsSuccess,
  FetchOrganizationsFailure,
  FetchOrganizationsRequest,
  FetchOrganizationsSuccess,
  FetchUploadRecordsFailure,
  FetchUploadRecordsRequest,
  FetchUploadRecordsSuccess,
  FetchUploadsFailure,
  FetchUploadsRequest,
  FetchUploadsSuccess,
  FileUploadFailure,
  FileUploadRequest,
  FileUploadSuccess,
  UserSignInFailure,
  UserSignInRequest,
  UserSigninSuccess,
} from "../Slices/UserAuthenticationSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const clientSigninS1 =
  (formData, setContinueLoading) => async (dispatch) => {
    dispatch(UserSignInRequest());
    try {
      const response = await userSignAPI(formData);

      if (response.code === 200 && response.data) {
        dispatch(
          UserSigninSuccess({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );
        return response.data;
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      if (setContinueLoading) {
        setContinueLoading(false);
      }

      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data?.message || "Login failed";
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "An unexpected error occurred";
      }

      toast.error(errorMessage);
      dispatch(UserSignInFailure(errorMessage));
      throw error;
    }
  };

export const fetchOrganizations = (setContinueLoading) => async (dispatch) => {
  dispatch(FetchOrganizationsRequest());
  try {
    const response = await fetchOrganizationsAPI();
    if (response.code === 200 && response.data) {
      dispatch(FetchOrganizationsSuccess(response.data.organizations));
    } else {
      throw new Error(response.message || "Failed to fetch organizations");
    }
  } catch (error) {
    if (setContinueLoading) {
      setContinueLoading(false);
    }
    toast.error(error.message);
    dispatch(FetchOrganizationsFailure(error.message));
  }
};

// Fetch Uploads Data
export const fetchUploads =
  (filterData, setContinueLoading) => async (dispatch) => {
    dispatch(FetchUploadsRequest());
    try {
      const response = await fetchUploadsAPI(filterData);
      if (response.code === 200 && response.data) {
        dispatch(FetchUploadsSuccess(response.data.uploads));
      } else {
        throw new Error(response.message || "Failed to fetch uploads");
      }
    } catch (error) {
      if (setContinueLoading) {
        setContinueLoading(false);
      }
      toast.error(error.message);
      dispatch(FetchUploadsFailure(error.message));
    }
  };

// Fetch Filtered Uploads Data
export const fetchFilteredUploads =
  (filterData, setContinueLoading) => async (dispatch) => {
    dispatch(FetchFilteredUploadsRequest());
    try {
      const response = await fetchUploadsAPI(filterData);
      if (response.code === 200 && response.data) {
        dispatch(FetchFilteredUploadsSuccess(response.data.uploads));
      } else {
        throw new Error(response.message || "Failed to fetch filtered uploads");
      }
    } catch (error) {
      if (setContinueLoading) {
        setContinueLoading(false);
      }
      toast.error(error.message);
      dispatch(FetchFilteredUploadsFailure(error.message));
    }
  };

export const uploadFile =
  (holder, template, dropDownValue, file) => async (dispatch) => {
    dispatch(FileUploadRequest());
    try {
      const response = await uploadFileAPI(
        holder,
        template,
        dropDownValue,
        file
      );
      if (response.code === 200 && response.data) {
        dispatch(FileUploadSuccess(response.data.upload));
      } else {
        throw new Error(response.message || "Failed to upload file");
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(FileUploadFailure(error.message));
    }
  };
export const fetchUploadRecords =
  (uploadId, searchText) => async (dispatch) => {
    dispatch(FetchUploadRecordsRequest());
    try {
      const response = await fetchUploadRecordsAPI(uploadId, searchText); // Pass the requestBody here
      if (response.code === 200 && response.data) {
        dispatch(FetchUploadRecordsSuccess(response.data.uploads));
      } else {
        throw new Error(response.message || "Failed to fetch upload records");
      }
    } catch (error) {
      dispatch(FetchUploadRecordsFailure(error.message));
    }
  };
export const deleteProperties =
  (uploadId, ids, selectedUpload, setSelectedProperties) =>
  async (dispatch) => {
    dispatch(DeletePropertiesRequest());
    const token = Cookies.get("token"); // Get JWT token
    try {
      const response = await axios.delete(
        `http://52.32.15.59:8000/v1/upload/${uploadId}/records?ids=${ids.join(
          ","
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(fetchUploadRecords(selectedUpload));
        setSelectedProperties(new Set());
        dispatch(DeletePropertiesSuccess());
        toast.success("Properties deleted successfully....");
        return response.data;
      }
    } catch (error) {
      dispatch(DeletePropertiesFailure(error.message));
      throw error;
    }
  };
export const deleteUpload = createAsyncThunk(
  "uploads/deleteUpload",
  async (uploadId, setSelectedUploads, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteUploadAPI(uploadId);
      if (response.code === 200) {
        const filterData = { sortBy: "createdAt", order: "DESC", search: "" };
        setSelectedUploads(new Set());
        dispatch(fetchUploads(filterData));
        toast.success("Upload deleted successfully....");
        return uploadId;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
