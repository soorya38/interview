/**
 * Submit an answer to the backend
 * @param {Object} payload - The answer submission payload
 * @param {number} payload.questionId - The ID of the question being answered
 * @param {string} payload.answer - The user's answer text
 * @returns {Promise<Object>} - Response from the server
 */
export const submitAnswer = async ({ questionId, answer }) => {
  // Simulating an API call with a Promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Answer submitted successfully',
        data: { questionId, answer }
      });
    }, 500);
  });
};