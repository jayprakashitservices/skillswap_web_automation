function randomString(length = 5) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function generateUser() {
  const random = randomString();

  return {
    firstName: 'Test' + random,
    lastName: 'User' + random,
    email: `test${random}@mail.com`,
    password: 'Test@1234'
  };
}

function generateCompany() {
  const random = randomString(6);
  const companyName = `Company${random}`;

  const sizes = [
    'justMe',
    '2_9',
    '10_99',
    '100_1000',
    '1000_plus'
  ];
  const countries = ['United States', 'Canada', 'India', 'Germany'];

  return {
    companySize: sizes[Math.floor(Math.random() * sizes.length)],
    companyName,
    website: `https://www.${companyName.toLowerCase()}.com`,
    country: countries[Math.floor(Math.random() * countries.length)]
  };
}

module.exports = { generateUser, generateCompany };