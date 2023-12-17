import React, { useState, useEffect } from "react";

const messages = [
  "This is the first message.",
  "This is the second message.",
  "And here's the third message.",
  // Add more messages as needed
];

function ScrollingText() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 50000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-hidden">
      <p className="whitespace-nowrap animate-marquee">
        {messages[currentMessageIndex]}
      </p>
    </div>
  );
}

export default ScrollingText;
