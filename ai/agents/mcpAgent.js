const { askLLM } = require('../llm');
const tools = require('../tools/playwrightTools');

async function runAgent(page, instruction) {
  let context = `Instruction: ${instruction}`;

  for (let i = 0; i < 5; i++) {
    const prompt = `
You are an automation agent.

Available actions:
- openPage(url)
- click(selector)
- type(selector, text)
- getText(selector)

Current context:
${context}

Decide next action in JSON:
{ "action": "", "args": [] }
`;

    const response = await askLLM(prompt);

    const actionObj = JSON.parse(response);

    const result = await tools[actionObj.action](page, ...actionObj.args);

    context += `\nAction: ${response}\nResult: ${result}`;
  }
}

module.exports = { runAgent };