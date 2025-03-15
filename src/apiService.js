// apiService.js

// Simulate a login API call
export const loginApi = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = "dummy-jwt-token"; // Example token
        resolve({ token });
      }, 1000);
    });
  };
  
  // Simulate a signup API call
  export const signupApi = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = "dummy-jwt-token"; // Example token
        resolve({ token });
      }, 1000);
    });
  };
  
  // Simulate a logout API call
  export const logoutApi = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "Logged out successfully" });
      }, 500);
    });
  };
  