import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SplitText = ({ 
  text, 
  type = "chars,words,lines", 
  className = "", 
  onComplete 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const splitTypes = type.split(",");
    const lines = []; // For line handling
    const words = text.split(" "); // Words split by spaces
    container.innerHTML = ""; // Clear initial content

    // Helper function to wrap each character or word in a span
    const wrapElement = (content, className) => {
      const span = document.createElement("span");
      span.className = className;
      span.style.display = "inline-block";
      span.textContent = content;
      return span;
    };

    // Build DOM structure for words and characters
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.style.display = "inline-block";

      Array.from(word).forEach((char, charIndex) => {
        if (splitTypes.includes("chars")) {
          const charSpan = wrapElement(char, "char");
          wordSpan.appendChild(charSpan);
        } else {
          wordSpan.appendChild(document.createTextNode(char));
        }
      });

      // Add space between words
      if (wordIndex < words.length - 1) {
        wordSpan.appendChild(document.createTextNode(" "));
      }

      container.appendChild(wordSpan);

      // Store words for future use (if animating lines)
      if (splitTypes.includes("lines")) {
        lines.push(wordSpan);
      }
    });

    // Handle line breaking for "lines" type
    if (splitTypes.includes("lines")) {
      const lineWrapper = document.createElement("div");
      lineWrapper.className = "line";
      container.childNodes.forEach((node) => {
        lineWrapper.appendChild(node.cloneNode(true));
      });

      container.innerHTML = ""; // Clear again
      container.appendChild(lineWrapper);
    }

    // Trigger the onComplete callback with the generated spans
    if (onComplete) {
      const chars = Array.from(container.querySelectorAll(".char"));
      const words = Array.from(container.querySelectorAll(".word"));
      const lines = Array.from(container.querySelectorAll(".line"));
      onComplete({ chars, words, lines });
    }
  }, [text, type, onComplete]);

  return <div ref={containerRef} className={`split-text ${className}`}></div>;
};

export default SplitText;
