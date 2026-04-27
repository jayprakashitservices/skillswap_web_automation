// utils/dataHelper.js
const signuptestData = require('../utils/signuptestData');
const { generateUser } = require('./dataGenerator');

function getSignupUser() {
  return {
    ...signuptestData.signup.validUser,
    email: generateUser().email
  };
}

module.exports = { getSignupUser };