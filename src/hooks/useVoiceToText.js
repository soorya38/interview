import { useState, useCallback } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';

export const useVoiceToText = () => {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleTranscriptUpdate = useCallback((finalText, interimText) => {
    if (finalText) setTranscript(prev => `${prev} ${finalText}`.trim());
    setInterimTranscript(interimText || '');
  }, []);

  const { startRecognition, stopRecognition, isSupported, error } = useSpeechRecognition({
    onTranscript: handleTranscriptUpdate
  });

  const handleStartListening = useCallback(() => {
    if (!isListening) {
      startRecognition();
      setIsListening(true);
    }
  }, [isListening, startRecognition]);

  const handleStopListening = useCallback(() => {
    if (isListening) {
      stopRecognition();
      setIsListening(false);
      setInterimTranscript('');
    }
  }, [isListening, stopRecognition]);

  const updateTranscript = useCallback((newTranscript) => {
    setTranscript(newTranscript);
  }, []);

  return {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    error,
    handleStartListening,
    handleStopListening,
    setTranscript: updateTranscript // Expose the setter function
  };
};