import React from "react";
import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe({ recipe = "" }) {
  const clean = recipe.trim().replace(/undefined\s*$/, "");
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Claude Recommends:</h2>
      <ReactMarkdown>{clean}</ReactMarkdown>
    </section>
  );
}