// import { Middleware } from "@reduxjs/toolkit";

// const authMiddleware: Middleware = () => (next) => (action: any) => {
//   if (action.type.endsWith("/rejected")) {
//     const error = action.error;
//     if (error && error.response && error.response.status === 401) {
//       window.location.href = "/login";
//     }
//   }
//   return next(action);
// };

// export default authMiddleware;
