const isSpeechSynthesisSupported = 'speechSynthesis' in window;

const speak = (text) => {
  if (isSpeechSynthesisSupported) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1.5;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis is not supported in this browser.');
  }
};

export default speak;
