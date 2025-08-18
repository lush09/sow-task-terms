const API_BASE_URL = 'https://sow-task-backend.onrender.com/api';

// Generic fetch function with error handling
const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Language-related API calls
export const languageApi = {
  // Get all languages
  getAllLanguages: () => fetchFromApi('/languages'),
  
  // Get a specific language by ID
  getLanguageById: (id) => fetchFromApi(`/languages/${id}`)
};

export default languageApi;