// export const isAuthenticated = ():boolean => {
//     return !!localStorage.getItem("token");
// }

export const isAuthenticated = (): boolean => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    return !!token; // returns true if token exists, otherwise false
  };