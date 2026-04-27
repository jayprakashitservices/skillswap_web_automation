function generateLoginTestPrompt(dom) {
  return `
You are a Playwright automation expert.

Analyze this DOM:
${dom}

Generate:
1. Playwright test
2. Use getByTestId selectors
3. Use POM structure
4. Add assertions

Return only code.
`;
}

module.exports = { generateLoginTestPrompt };