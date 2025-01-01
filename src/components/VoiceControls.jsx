import React from 'react';

const VoiceControls = ({ isListening, onStart, onStop }) => (
  <div className="flex gap-4 justify-center">
    <button
      onClick={onStart}
      disabled={isListening}
      className={`px-4 py-2 rounded-lg text-white ${
        isListening 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-green-500 hover:bg-green-600'
      }`}
    >
      Start Listening
    </button>
    
    <button
      onClick={onStop}
      disabled={!isListening}
      className={`px-4 py-2 rounded-lg text-white ${
        !isListening 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-red-500 hover:bg-red-600'
      }`}
    >
      Stop Listening
    </button>
  </div>
);