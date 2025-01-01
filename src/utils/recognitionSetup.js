const CONFIDENCE_THRESHOLD = 0.8;

export const setupRecognition = ({ onTranscript, onError, onEnd }) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let finalTranscript = '';
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;

      if (result.isFinal && confidence >= CONFIDENCE_THRESHOLD) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    
    onTranscript(finalTranscript.trim(), interimTranscript);
  };

  recognition.onerror = (event) => {
    onError(event.error);
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
};