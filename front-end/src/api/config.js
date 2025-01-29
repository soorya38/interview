/**
 * API Configuration and Endpoints
 */

// Base API URL - replace with your actual API base URL
export const API_BASE_URL = 'https://api.example.com/v1';

/**
 * Authentication Endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
};

/**
 * Questions Endpoints
 */
export const QUESTION_ENDPOINTS = {
  FETCH_QUESTION: '/questions',
  SUBMIT_ANSWER: '/answers',
};

/**
 * API Request Payloads
 * @typedef {Object} Payloads
 */
export const PAYLOADS = {
  /**
   * @typedef {Object} LoginPayload
   * @property {string} email - User's email address
   * @property {string} password - User's password
   */
  LOGIN: {
    email: '',
    password: '',
  },

  /**
   * @typedef {Object} RegisterPayload
   * @property {string} email - User's email address
   * @property {string} password - User's password
   * @property {string} name - User's full name
   */
  REGISTER: {
    email: '',
    password: '',
    name: '',
  },

  /**
   * @typedef {Object} RefreshTokenPayload
   * @property {string} refreshToken - The refresh token
   */
  REFRESH_TOKEN: {
    refreshToken: '',
  },

  /**
   * @typedef {Object} SubmitAnswerPayload
   * @property {number} questionId - The ID of the question being answered
   * @property {string} answer - The user's answer text
   */
  SUBMIT_ANSWER: {
    questionId: 0,
    answer: '',
  },
};