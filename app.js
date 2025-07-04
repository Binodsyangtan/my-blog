const express = require("express");
const app = express();
//const app = require("express")()

const {
  renderHomePage,
  renderRegisterPage,
  handleRegister,
  renderLoginPage,
  hanldeLogin,
} = require("./controllers/authController");

const cookieParser = require("cookie-parser");

require("./model/index");

const authRoute = require("./routes/authRoute");
const questionRoute = require("./routes/questionRoute");
//ejs set gareko use ganalai ejs
app.set("view engine", "ejs");

//nodejs lai vaneko frontend form bata kai data aaudaixa telsai bujha
app.use(express.urlencoded({ extended: true })); //serverside rendering

app.use(express.json()); //external ,like react,vuejs

//nodejs le cookie read garna sakdaina so package ko help linu parxa
app.use(cookieParser());
 
//locahost:3000 ,locahost:3000/ + register ----> localhost:3000/regiter
//yo code use gare sabko authRoute ko sab use hunxa
app.use("/", authRoute);
app.use("/", questionRoute);

//nodejs lai vaneko public/css use garna de vanera
//if yo code nalekhe didaina nodejs le access
app.use(express.static("public/css/"));

const port = 3000;
app.listen(port, () => {
  console.log(`project has started at port ${port}`);
});
