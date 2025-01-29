import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import LoadingSpinner from './LoadingSpinner';
import { useQuestionLogic } from '../containers/QuestionContainer';

const QuestionView = () => {
  const {
    questionData,
    transcript,
    interimTranscript,
    isListening,
    isEditing,
    isSubmitting,
    error,
    canSubmit,
    handleStartListening,
    handleStopListening,
    handleEditingToggle,
    handleSubmitAnswer,
    handleTimeUp,
    handleAnswerChange
  } = useQuestionLogic();

  if (!questionData) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
    >
      <div className="max-w-3xl mx-auto">
        <AnimatePresence>
          <QuestionCard
            questionData={questionData}
            transcript={transcript}
            interimTranscript={interimTranscript}
            isListening={isListening}
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            handleStartListening={handleStartListening}
            handleStopListening={handleStopListening}
            handleEditingToggle={handleEditingToggle}
            handleSubmitAnswer={handleSubmitAnswer}
            handleAnswerChange={handleAnswerChange}
            canSubmit={canSubmit}
            onTimeUp={handleTimeUp}
          />
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center"
          >
            Error: {error}. Please try again.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionView;