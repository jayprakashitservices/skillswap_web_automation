// utils/testData.js
module.exports = {
  validUser: {
    email: "john@mailinator.com",
    password: "Wood@123"
  },
  invalidUser: {
    email: "wrong@test.asdasd",
    password: "wrong123"
  },
  userNotfound: {
    email: "wrong@test.com",
    password: "wrong123"
  },
  emptyData:{
    email: "",
    password: ""
}
};