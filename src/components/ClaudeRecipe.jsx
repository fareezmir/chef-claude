import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe({ recipe }) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const speed = 10; // faster typing
    const typing = setInterval(() => {
      setDisplayed((prev) => prev + recipe[i]);
      i++;
      if (i >= recipe.length) clearInterval(typing);
    }, speed);

    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => {
      clearInterval(typing);
      clearInterval(blink);
    };
  }, [recipe]);

  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Claude Recommends:</h2>
      <ReactMarkdown>{displayed}</ReactMarkdown>
      <span className="cursor">{cursorVisible ? "|" : " "}</span>
    </section>
  );
}
