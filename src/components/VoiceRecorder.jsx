import React, { useEffect } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const VoiceRecorder = ({ isRecording, onTranscriptUpdate }) => {
  const { 
    startRecognition, 
    stopRecognition, 
    isSupported, 
    error,
    isActive 
  } = useSpeechRecognition({
    onTranscript: onTranscriptUpdate
  });

  useEffect(() => {
    if (!isSupported) {
      console.error('Speech recognition is not supported in this browser');
      return;
    }

    if (isRecording && !isActive) {
      startRecognition();
    } else if (!isRecording && isActive) {
      stopRecognition();
    }
  }, [isRecording, isActive, startRecognition, stopRecognition, isSupported]);

  if (!isSupported) {
    return (
      <div className="text-red-500 text-center">
        Speech recognition is not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl">
        {isActive ? <FaMicrophone className="text-red-500 animate-pulse" /> : <FaStop />}
      </div>
      <p className="text-gray-600">
        {isActive ? 'Recording...' : 'Recording stopped'}
      </p>
      {error && (
        <p className="text-red-500 text-sm">
          Error: {error}. Please try again.
        </p>
      )}
    </div>
  );
};

export default VoiceRecorder;