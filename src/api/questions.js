export const fetchQuestion = async () => {
  // Simulating an API call with a Promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        text: "What is your favorite programming language and why?",
        duration: 120 // duration in seconds
      });
    }, 500);
  });
};