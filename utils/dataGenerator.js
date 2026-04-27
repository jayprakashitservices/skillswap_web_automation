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

module.exports = { generateUser };