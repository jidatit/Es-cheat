import { toast } from "sonner";
import { userSignAPI } from "../Api'sFunctions/UserSignin";
import {
  UserSignInFailure,
  UserSignInRequest,
  UserSigninSuccess,
} from "../Slices/UserAuthenticationSlice";

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
