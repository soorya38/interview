import { useEffect, useRef, useCallback } from 'react';
import { useRecognitionState } from './useRecognitionState';
import { setupRecognition } from '../utils/recognitionSetup';

export const useSpeechRecognition = ({ onTranscript }) => {
  const recognitionRef = useRef(null);
  const { isActive, setIsActive, error, setError, clearError } = useRecognitionState();
  const isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (isSupported) {
      recognitionRef.current = setupRecognition({
        onTranscript,
        onError: setError,
        onEnd: () => setIsActive(false)
      });
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isSupported, onTranscript, setError, setIsActive]);

  const startRecognition = useCallback(() => {
    clearError();
    if (recognitionRef.current && !isActive) {
      try {
        recognitionRef.current.start();
        setIsActive(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setError(error.message);
      }
    }
  }, [isActive, clearError, setError, setIsActive]);

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current && isActive) {
      try {
        recognitionRef.current.stop();
        setIsActive(false);
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
    }
  }, [isActive, setIsActive]);

  return {
    isSupported,
    startRecognition,
    stopRecognition,
    error,
    isActive
  };
};