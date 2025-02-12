// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { TextField, Button } from '@mui/material';

// const ForgotPassword = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const onSubmit = (data) => {
//       console.log(data);
//       // Handle form submission
//     };
//   return (
    
//     <div className="flex justify-center items-center h-screen overflow-hidden ">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <div className="text-center mb-4">
//           <img src="/src/assets/logo.png" alt="logo-icon" className="mx-auto w-40" />
//         </div>
//         <h3 className="text-3xl font-poppins font-semibold text-center">Forgot Password</h3>
//         <h3 className=" text-gray-600 text-center mb-10">We’ll send you reset instructions on your email</h3>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//           <label className=" text-gray-500 font-small mb-1 flex justify-start  ">
//             Email*
//           </label>
//             <TextField
//               {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
//              placeholder='Enter Email'
//               variant="outlined"
//               fullWidth
//               error={!!errors.email}
//               helperText={errors.email ? errors.email.message : ''}
//               className="mb-4"
//               InputProps={{
//                 sx: {
//                   '.MuiInputBase-input': { padding: '10px' ,
                    
//                   },
//                   '.MuiOutlinedInput-notchedOutline': {
//                     borderRadius: '7px' // Ensures the border itself has rounded corners
//                   },
//                   '.MuiInputBase-input::placeholder': {
//                     fontSize: '13px', // Adjust placeholder size
//                     // Optional: Adjust transparency
//                   }

//                 }
//               }}
//             />
//           </div>
//           <Button
//            sx={{
//             textTransform:"none",
//             marginTop:"1rem",
//             borderRadius:"10px"
           
//           }}
//            type="submit" variant="contained" color="primary" fullWidth disabled={Object.keys(errors).length > 0}>
//            Send 6-digit code
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ForgotPassword;


















import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" fixed inset-0 flex justify-center items-center w-full h-[100vh] overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="text-center mb-4">
          <img src="/src/assets/logo.png" alt="logo-icon" className="mx-auto w-40" />
        </div>
        <h3 className="text-3xl font-poppins font-semibold text-center">Forgot Password</h3>
        <h3 className="text-gray-600 text-center mb-10">
          We’ll send you reset instructions on your email
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-4">
            <label className="text-gray-500 font-small mb-1 flex justify-start">
              Email*
            </label>
            <TextField
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              placeholder="Enter Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              className="mb-4"
              InputProps={{
                sx: {
                  '.MuiInputBase-input': { padding: '10px' },
                  '.MuiOutlinedInput-notchedOutline': { borderRadius: '7px' },
                  '.MuiInputBase-input::placeholder': { fontSize: '13px' }
                }
              }}
            />
          </div>
          <Button
            sx={{
              textTransform: "none",
              marginTop: "1rem",
              borderRadius: "10px"
            }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={Object.keys(errors).length > 0}
          >
            Send 6-digit code
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
