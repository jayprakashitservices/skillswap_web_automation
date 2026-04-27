const { askLLM } = require('../llm');
const { generateLoginTestPrompt } = require('../prompts/generateTest');
const fs = require('fs');

async function generateTest(dom) {
  const prompt = generateLoginTestPrompt(dom);
  const code = await askLLM(prompt);

  fs.writeFileSync('tests/generated.spec.js', code);
  console.log("✅ Test generated - testGenerator.js:10");
}

module.exports = { generateTest };