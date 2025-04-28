const {
  handleRegister,
  renderRegisterPage,
  renderLoginPage,
  hanldeLogin,
  renderHomePage,
} = require("../controllers/authCOntroller");

const router = require("express").Router();

router.route("/").get(renderHomePage);

router.route("/register").post(handleRegister).get(renderRegisterPage);

router.route("/login").get(renderLoginPage).post(hanldeLogin);

module.exports = router;
