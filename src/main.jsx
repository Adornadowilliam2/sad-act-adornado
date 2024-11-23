import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Confetti from "react-confetti";

// Move the state inside the App component.
function Main() {
  const [showconfetti, setShowConfetti] = useState(false);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <React.StrictMode>
      {showconfetti && <Confetti />}
      <App handleConfetti={handleConfetti} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
