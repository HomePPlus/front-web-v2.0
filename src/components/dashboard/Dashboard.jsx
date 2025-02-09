// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ChecklistForm from './checklist/ChecklistForm';

// const Dashboard = () => {
//   const [error, setError] = useState(null);

//   // 에러 알림 표시 함수
//   const showErrorToast = (message) => {
//     toast.error(message, {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   // 성공 알림 표시 함수
//   const showSuccessToast = (message) => {
//     toast.success(message, {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   return (
//     <div className="dashboard-container">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <ChecklistForm 
//         onError={(message) => {
//           setError(message);
//           showErrorToast(message);
//         }}
//         onSuccess={(message) => {
//           showSuccessToast(message);
//         }}
//       />
//     </div>
//   );
// };

// export default Dashboard; 