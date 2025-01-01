import { API_BASE_URL, AUTH_ENDPOINTS, QUESTION_ENDPOINTS } from './config';

/**
 * Authentication API calls
 */
export const authAPI = {
  /**
   * Login user
   * @param {Object} payload
   * @param {string} payload.email - User's email
   * @param {string} payload.password - User's password
   * @returns {Promise<Object>} Response containing user data and tokens
   */
  login: async ({ email, password }) => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, email },
          token: 'mock-jwt-token',
        });
      }, 500);
    });
  },

  /**
   * Register new user
   * @param {Object} payload
   * @param {string} payload.email - User's email
   * @param {string} payload.password - User's password
   * @param {string} payload.name - User's full name
   * @returns {Promise<Object>} Response containing user data
   */
  register: async ({ email, password, name }) => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, email, name },
          token: 'mock-jwt-token',
        });
      }, 500);
    });
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },
};

/**
 * Questions API calls
 */
export const questionsAPI = {
  /**
   * Fetch interview question
   * @returns {Promise<Object>} Question data
   */
  fetchQuestion: async () => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          text: "What is your favorite programming language and why?",
          duration: 120 // duration in seconds
        });
      }, 500);
    });
  },

  /**
   * Submit answer to a question
   * @param {Object} payload
   * @param {number} payload.questionId - Question ID
   * @param {string} payload.answer - User's answer
   * @returns {Promise<Object>} Submission response
   */
  submitAnswer: async ({ questionId, answer }) => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Answer submitted successfully',
          data: { questionId, answer }
        });
      }, 500);
    });
  },
};