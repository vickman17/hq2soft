// src/utils/userStorage.ts

interface UserDetails {
    sspId: string;
    firstName: string;
    lastName: string;
    phone: string;
    [key: string]: any; // Allows additional dynamic fields
  }
  
  const USER_STORAGE_KEY = 'user_details';
  
  /**
   * Save user details to sessionStorage.
   * @param user - User details object
   */
  export const saveUserDetails = (user: UserDetails) => {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  };
  
  /**
   * Retrieve user details from sessionStorage.
   * @returns UserDetails | null
   */
  export const getUserDetails = (): UserDetails | null => {
    const user = sessionStorage.getItem(USER_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  };
  
  /**
   * Clear user details from sessionStorage.
   */
  export const clearUserDetails = () => {
    sessionStorage.removeItem(USER_STORAGE_KEY);
  };
  