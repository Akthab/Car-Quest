import axios from "axios";
// import { reduxStore } from 'store/reduxStore';

export const backendAuth = axios.create({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

// backendAuth.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${reduxStore.getState().userProfile.sessionToken}`;
//     return config;
// });

// backendAuth.interceptors.response.use((response) => {
//     console.log('RESPONSE ' + response);
// });
