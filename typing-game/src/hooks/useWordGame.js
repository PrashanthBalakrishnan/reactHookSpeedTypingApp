import { useEffect, useState, useRef } from 'react';

const useWordGame = (startTime = 5) => {
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(startTime);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const typeRef = useRef(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const calculateWordCount = (text) => {
    const wordsArr = text.trim().split(' ');
    return wordsArr.filter((word) => word !== '').length;
  };

  useEffect(() => {
    if (timeRemaining && isTimeRunning > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(startTime);
    setText(' ');
    typeRef.current.disabled = false;
    typeRef.current.focus();
  };

  const endGame = () => {
    setIsTimeRunning(false);
    setWordCount(calculateWordCount(text));
  };

  return {
    typeRef,
    handleChange,
    text,
    isTimeRunning,
    timeRemaining,
    startGame,
    wordCount,
  };
};

export default useWordGame;
