// src/apis/ApiUrls.js
const ApiUrls = {
  BASE_URL: "http://52.32.15.59:8000",
  AUTH: {
    ADMIN_LOGIN: "/v1/auth/sign-in",
    FORGOT_PASSWORD: "/v1/auth/forgot-password",
  },
  USER: {
    USER_ORGANIZATIONS: "/v1/user/organizations",
    FILTERED_DATA: "/v1/upload/filters",
  },
};

export default ApiUrls;
