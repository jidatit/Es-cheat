import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import '../index.css'; 

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

//   const onSubmit = async (data) => {
//     try {
//       const response = await AuthService.login(data);
//       AuthService.handleAuthResponse(response);
//       history.push(RouteConstant.DASHBOARD);
//     } catch (error) {
//       console.error(error);
//     }
//   };

const handleForgotPassword = () => {
    console.log("Forgot password button clicked");
    navigate('/forgot-password');
  };

  return (
    <div className=" fixed inset-0 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg  w-full max-w-lg">
        <div className="text-center mb-6">
          <img 
          src="/src/assets/logo.png"
           alt="logo-icon"
         className="mx-auto w-40" />
        </div>
      
        <h3 className="text-3xl font-semibold font-poppins text-center">Login to your account</h3>
        <h3 className=" text-gray-600 text-center mb-10">Enter your crendentials to go in.</h3>
       
        <form >
          <div className="mb-4">
          <label className=" text-gray-500 font-small mb-1 flex justify-start  ">
            Email*
          </label>
            <TextField
            placeholder='Enter Email'
              {...register('email', {
                 required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
              variant="outlined"
              fullWidth
           
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              InputProps={{
                sx: {
                  '.MuiInputBase-input': { padding: '10px' ,
                    
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    borderRadius: '7px' // Ensures the border itself has rounded corners
                  },
                  '.MuiInputBase-input::placeholder': {
                    fontSize: '13px', // Adjust placeholder size
                    // Optional: Adjust transparency
                  },
                   // 🔥 Remove autofill blue background
      "& input:-webkit-autofill": {
        boxShadow: "0 0 0 100px white inset !important", 
        "-webkit-text-fill-color": "black !important",
      },

                }
              }}
              
            />
          </div>
          <div className="">
          <label className=" text-gray-500 font-small mb-1 flex justify-start  ">
            Password*
          </label>
            <TextField
            placeholder='Enter Password'
              {...register('password', { required: 'Password is required' })}
            
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                    '.MuiInputBase-input': { padding: '10px' ,
                      
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '7px' // Ensures the border itself has rounded corners
                    },
                    '.MuiInputBase-input::placeholder': {
                        fontSize: '13px', // Adjust placeholder size
                        // Optional: Adjust transparency
                      },
                       // 🔥 Remove autofill blue background
      "& input:-webkit-autofill": {
        boxShadow: "0 0 0 100px white inset !important", 
        "-webkit-text-fill-color": "black !important",
      },
  
                  }
        
              }}
             
            />
          </div>
          <div className=" flex justify-between">
          <Button
          onClick={handleForgotPassword}
           color="primary"
          sx={{
            textTransform:"none",
         

           
          }}>
            Forgot Password?
          </Button>
          </div>
        
          <Button
          sx={{
            textTransform:"none",
            marginTop:"2rem",
            borderRadius:"10pxs"
          
          }} type="submit" variant="contained" color="primary" fullWidth >
           {/* disabled={!errors.email && !errors.password} > */}
            Login
          </Button>
       
        </form>
      </div>
    </div>
  );
};
export default Login;