// import { authService } from "../services/authService";

// export const setupFetchInterceptor = () => {
//     const originalFetch = window.fetch;
//     window.fetch = async (url, options = {}) => {
//         const token = localStorage.getItem('token');
//         options.headers = {
//             ...options.headers,
//             'Content-Type': 'application/json',
//             ...(token && { Authorization: `Bearer ${token}` })
//         };
//         const response = await originalFetch(url, options);

//         if ( response.status === 401 ) {
//             authService.logout();
//         }

//         return response;
//     };
// };