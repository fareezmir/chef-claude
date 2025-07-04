export async function getRecipeFromChefClaude(ingredientsArr) {
  const res = await fetch("/api/getRecipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsArr })
  });
  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }
  const { recipe } = await res.json();
  return recipe;
}