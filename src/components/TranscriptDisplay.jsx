import React from 'react';

const TranscriptDisplay = ({ transcript, interimTranscript }) => (
  <div className="mt-6 border border-gray-300 rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">Final Transcript:</h3>
    <p className="mb-4">{transcript || "Start speaking to see the text here."}</p>
    
    <h3 className="text-lg font-semibold mb-2">Interim Transcript:</h3>
    <p className="text-gray-600">{interimTranscript}</p>
  </div>
);

export default TranscriptDisplay;