import React from 'react';
import { motion } from 'framer-motion';

const AnswerEditor = ({ answer, isEditing, onChange }) => {
  return isEditing ? (
    <motion.textarea
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      value={answer}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 border rounded-lg min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
      placeholder="Type your answer here..."
    />
  ) : (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-gray-50 rounded-lg min-h-[150px] whitespace-pre-wrap"
    >
      {answer || 'No answer yet. Start speaking or click Edit to type.'}
    </motion.div>
  );
};

export default AnswerEditor;