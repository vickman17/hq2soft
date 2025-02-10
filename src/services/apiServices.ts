import axios from 'axios';

const API_BASE_URL = 'https://hq2soft.com/hq2sspapi'; // Update this to your backend base URL.

export const fetchJobsForProvider = async (serviceProviderId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/JobHandler.php`, {
      params: { provider_id: serviceProviderId },
    });
    return response.data; // Expecting JSON response
  } catch (error) {
    // Narrowing down the type of 'error'
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      throw new Error(error.response?.data?.message || 'Failed to fetch jobs.');
    } else {
      // Non-Axios error (generic)
      throw new Error('An unknown error occurred.');
    }
  }
};
