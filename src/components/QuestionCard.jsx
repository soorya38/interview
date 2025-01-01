import React from 'react';
import { motion } from 'framer-motion';
import QuestionTimer from './QuestionTimer';
import AnswerEditor from './AnswerEditor';
import Controls from './Controls';

const QuestionCard = ({ 
  questionData, 
  transcript, 
  interimTranscript, 
  isListening,
  isEditing,
  isSubmitting,
  handleStartListening,
  handleStopListening,
  handleEditingToggle,
  handleSubmitAnswer,
  handleAnswerChange,
  canSubmit,
  onTimeUp 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-8 text-gray-800 text-center"
      >
        Interview Question
      </motion.h1>

      <QuestionTimer
        question={questionData.text}
        duration={questionData.duration}
        onTimeUp={onTimeUp}
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Controls 
          isRecording={isListening}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          onRecordingToggle={isListening ? handleStopListening : handleStartListening}
          onEditingToggle={handleEditingToggle}
          onSubmit={handleSubmitAnswer}
          canSubmit={canSubmit}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Answer:</h2>
        <AnswerEditor 
          answer={transcript}
          isEditing={isEditing}
          onChange={handleAnswerChange}
        />
        {isListening && interimTranscript && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-gray-500 italic"
          >
            {interimTranscript}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;