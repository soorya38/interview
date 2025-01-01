import React from 'react';
import { FaMicrophone, FaStop, FaEdit, FaSave, FaPaperPlane } from 'react-icons/fa';

const Controls = ({ 
  isRecording, 
  isEditing,
  isSubmitting,
  onRecordingToggle, 
  onEditingToggle,
  onSubmit,
  canSubmit 
}) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onRecordingToggle}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isEditing || isSubmitting}
      >
        {isRecording ? (
          <>
            <FaStop /> Stop Recording
          </>
        ) : (
          <>
            <FaMicrophone /> Start Recording
          </>
        )}
      </button>
      <button
        onClick={onEditingToggle}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isRecording || isSubmitting}
      >
        {isEditing ? (
          <>
            <FaSave /> Save
          </>
        ) : (
          <>
            <FaEdit /> Edit Answer
          </>
        )}
      </button>
      <button
        onClick={onSubmit}
        disabled={!canSubmit || isRecording || isEditing}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaPaperPlane /> {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default Controls;