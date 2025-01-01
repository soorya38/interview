import { useState, useCallback, useEffect } from 'react';
import { useVoiceToText } from '../hooks/useVoiceToText';
import { questionsAPI } from '../api';
import { showSuccessToast } from '../utils/toast';

export const useQuestionLogic = () => {
  const [questionData, setQuestionData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answer, setAnswer] = useState('');
  
  const {
    transcript,
    interimTranscript,
    isListening,
    error,
    handleStartListening,
    handleStopListening,
    setTranscript
  } = useVoiceToText();

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const data = await questionsAPI.fetchQuestion();
        setQuestionData(data);
      } catch (error) {
        console.error('Failed to fetch question:', error);
      }
    };

    loadQuestion();
  }, []);

  const handleSubmitAnswer = async () => {
    if (!answer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await questionsAPI.submitAnswer({
        questionId: questionData.id,
        answer: answer.trim()
      });
      setIsSubmitted(true);
      showSuccessToast('Answer submitted successfully!');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeUp = useCallback(async () => {
    if (isListening) {
      handleStopListening();
    }
    if (!isSubmitted) {
      await handleSubmitAnswer();
    }
  }, [isListening, handleStopListening, isSubmitted, handleSubmitAnswer]);

  const handleEditingToggle = useCallback(() => {
    if (isEditing) {
      setTranscript(answer);
    }
    setIsEditing(!isEditing);
  }, [isEditing, answer, setTranscript]);

  const handleAnswerChange = useCallback((newAnswer) => {
    setAnswer(newAnswer);
  }, []);

  const canSubmit = answer.trim().length > 0 && !isSubmitted && !isSubmitting;

  return {
    questionData,
    transcript: answer,
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
  };
};