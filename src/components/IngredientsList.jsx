import React, { forwardRef } from "react";

const IngredientsList = forwardRef(
  ({ ingredients, getRecipe, removeIngredient, loading }, ref) => (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredients.map((ingredient, idx) => (
          <li key={idx} className="ingredient-item">
            {ingredient}
            <button
              className="remove-btn"
              onClick={() => removeIngredient(idx)}
              aria-label={`Remove ${ingredient}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe} disabled={loading}>
            {loading ? "Thinking..." : "Get a recipe"}
          </button>
        </div>
      )}
    </section>
  )
);

export default IngredientsList;