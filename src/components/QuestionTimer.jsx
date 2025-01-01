import React from 'react';
import Timer from './Timer';

const QuestionTimer = ({ question, duration, onTimeUp }) => {
  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Question:</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          {question}
        </div>
      </div>

      <div className="mb-6">
        <Timer duration={duration} onTimeUp={onTimeUp} />
      </div>
    </div>
  );
};

export default QuestionTimer;