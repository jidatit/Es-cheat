import axios from "axios";
import ApiUrls from "../../api/ApiUrls";
import Cookies from "js-cookie";
export const userSignAPI = async (formData) => {
  try {
    const apiUrl = `${ApiUrls.BASE_URL}${ApiUrls.AUTH.ADMIN_LOGIN}`;

    const response = await axios.post(apiUrl, {
      email: formData.email,
      password: formData.password,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Pass through the error response for handling
    }
    throw error;
  }
};

export const fetchOrganizationsAPI = async () => {
  try {
    const token = Cookies.get("token"); // Get JWT from cookies
    const apiUrl = `${ApiUrls.BASE_URL}${ApiUrls.USER.USER_ORGANIZATIONS}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Return the API error response
    }
    throw error;
  }
};

export const fetchUploadsAPI = async (filterData) => {
  try {
    const token = Cookies.get("token"); // Get JWT from cookies
    const apiUrl = `${ApiUrls.BASE_URL}${ApiUrls.USER.FILTERED_DATA}`;
    const response = await axios.post(apiUrl, filterData, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Pass through the error response for handling
    }
    throw error;
  }
};
export const uploadFileAPI = async (holder, template, dropDownValue, file) => {
  try {
    const token = Cookies.get("token"); // Get JWT from cookies
    const apiUrl = `${ApiUrls.COMMON_URL}/holder/${holder}/upload`;

    const formData = new FormData();
    formData.append("holder", holder);
    formData.append("template", template);
    formData.append("dropdown_value", dropDownValue);
    formData.append("file", file);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Send as form-data
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Pass through the error response for handling
    }
    throw error;
  }
};
export const fetchUploadRecordsAPI = async (uploadId, searchText) => {
  try {
    const token = Cookies.get("token"); // Get JWT token
    const apiUrl = `${ApiUrls.COMMON_URL}/upload/${uploadId}/records/filters`;

    const response = await axios.post(
      apiUrl,
      {
        sortBy: "createdAt",
        order: "DSC",
        limit: 20,
        search: searchText,
        page: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};
export const deleteUploadAPI = async (uploadId) => {
  try {
    const token = Cookies.get("token"); // Get JWT token
    const apiUrl = `${ApiUrls.COMMON_URL}/upload?ids=${uploadId}`;

    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};
