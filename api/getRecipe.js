import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY   
});

export default async function handler(req, res) {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Expected JSON body with an `ingredients` array" });
    }

    const ingredientsString = ingredients.join(", ");
    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you’d recommend I make!` }
      ]
    });

    return res.status(200).json({ recipe: msg.content[0].text });
  } catch (err) {
    console.error("Claude API error:", err);
    return res.status(500).json({ error: "Server error calling Claude API" });
  }
}
