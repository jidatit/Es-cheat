import axios from "axios";
import ApiUrls from "../../api/ApiUrls";

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
