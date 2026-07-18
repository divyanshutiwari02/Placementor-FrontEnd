// src/services/gemini.js

import { GoogleGenerativeAI }
from "@google/generative-ai";

// YOUR API KEY

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// GEMINI CLIENT

const genAI =
  new GoogleGenerativeAI(API_KEY);

// MODEL

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

// MAIN FUNCTION

export const getDeepAIFeedback =
async (
  question,
  answer,
  history = []
) => {

  const prompt = `
You are a senior MCA placement interviewer.

Context History:
${history.map(
  h =>
`Q: ${h.question}
A: ${h.answer}\n`
).join("")}

Current Question:
${question}

Student Answer:
${answer}

Return ONLY valid JSON.

{
  "score": "",
  "strengths": [],
  "weaknesses": [],
  "improvementPlan": [],
  "suggestedAnswer": "",
  "careerTip": ""
}

Rules:
- No markdown
- No stars
- No explanation outside JSON
- strengths should be array
- weaknesses should be array
- improvementPlan should be array
- Keep response concise
`;

try {

  const result =
  await model.generateContent(
    prompt
  );

let text =
  await result.response.text();

console.log(
  "RAW GEMINI RESPONSE:",
  text
);

  // REMOVE MARKDOWN

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\*\*/g, "")
    .trim();

  // FIND JSON PART

  const firstBrace =
    text.indexOf("{");

  const lastBrace =
    text.lastIndexOf("}");

  if (
    firstBrace !== -1 &&
    lastBrace !== -1
  ) {

    text = text.substring(
      firstBrace,
      lastBrace + 1
    );
  }

  console.log(
    "CLEANED JSON:",
    text
  );

  // PARSE JSON

  const parsed =
    JSON.parse(text);

  return parsed;

} catch (err) {

  console.error(
    "Gemini Error:",
    err
  );

  return {

    score: "0/10",

    strengths: [
      "AI feedback unavailable"
    ],

    weaknesses: [
      "Could not analyze answer"
    ],

    improvementPlan: [
      "Try again later"
    ],

    suggestedAnswer:
      "No suggested answer available.",

    careerTip:
      "Keep practicing daily."
  };
}
};
