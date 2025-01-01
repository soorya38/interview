import { useState } from 'react';

export const useRecognitionState = () => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  return {
    isActive,
    setIsActive,
    error,
    setError,
    clearError: () => setError(null)
  };
};