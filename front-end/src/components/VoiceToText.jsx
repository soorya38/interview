import React from 'react';
import { useVoiceToText } from '../hooks/useVoiceToText';
import VoiceControls from './VoiceControls';
import TranscriptDisplay from './TranscriptDisplay';

const VoiceToText = () => {
  const {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    error,
    handleStartListening,
    handleStopListening
  } = useVoiceToText();

  if (!isSupported) {
    return (
      <div className="p-6 text-center text-red-500">
        Your browser does not support the Web Speech API.
      </div>
    );
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">React Voice-to-Text</h1>
      
      <VoiceControls
        isListening={isListening}
        onStart={handleStartListening}
        onStop={handleStopListening}
      />

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">
          Error: {error}. Please try again.
        </p>
      )}

      <TranscriptDisplay
        transcript={transcript}
        interimTranscript={interimTranscript}
      />
    </div>
  );
};

export default VoiceToText;