const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "Practice makes perfect.",
  ];
  
  const quoteDisplay = document.getElementById("quote");
  const inputField = document.getElementById("input");
  const startBtn = document.getElementById("start-btn");
  const timeLeftEl = document.getElementById("time-left");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  
  let timer;
  let timeLeft = 60;
  let wordsTyped = 0;
  let correctChars = 0;
  let totalChars = 0;
  
  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  function startTest() {
    quoteDisplay.textContent = getRandomQuote();
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
    
    timeLeft = 60;
    wordsTyped = 0;
    correctChars = 0;
    totalChars = 0;
  
    timeLeftEl.textContent = timeLeft;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 0;
  
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      inputField.disabled = true;
      calculateStats();
      return;
    }
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
  }
  
  function calculateStats() {
    const text = inputField.value;
    wordsTyped = text.trim().split(/\s+/).length;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    
    wpmEl.textContent = wordsTyped;
    accuracyEl.textContent = accuracy.toFixed(2);
  }
  
  inputField.addEventListener("input", () => {
    const text = inputField.value;
    const quote = quoteDisplay.textContent;
  
    totalChars = text.length;
    correctChars = 0;
  
    for (let i = 0; i < text.length; i++) {
      if (text[i] === quote[i]) {
        correctChars++;
      }
    }
  
    calculateStats();
  });
  
  startBtn.addEventListener("click", startTest);
  