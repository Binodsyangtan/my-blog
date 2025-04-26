const express = require("express");
const { users } = require("./model/index");
const app = express();
//const app = require("express")()
const bcrypt = require("bcrypt");
const e = require("express");
const { where } = require("sequelize");

require("./model/index");

//ejs set gareko use ganalai ejs
app.set("view engine", "ejs");

//nodejs lai vaneko frontend form bata kai data aaudaixa telsai bujha
app.use(express.urlencoded({ extended: true })); //serverside rendering

app.use(express.json()); //external like react,vuejs

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("auth/register.ejs");
});

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.send("please provide username,email,password");
  }

  //model ko index ma lekheko users
  await users.create({
    username: username,
    password: bcrypt.hashSync(password, 10),
    email: email,
  });
  res.send("register successfully");
});

app.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});

app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
  if (!email || !password) {
    return res.send("please provide  email and password");
  }
  //destructuring gareko findAll ma array hunxa so datalai wrap gareko
  //email check
  const [data] = await users.findAll({
    where: { email: email },
  });
  if (data) {
    //next password check gareko bcrypt le method deko huxa
    const isMatched = bcrypt.compareSync(password, data.password);
    if (isMatched) {
      res.send("Login succcess");
    } else {
      res.send("Invalid email/password");
    }
  } else {
    res.send("no users with this email");
  }
});



//nodejs lai vaneko public/css use garna de vanera
//if yo code nalekhe didaina nodejs le access
app.use(express.static("public/css/"));

const port = 3000
app.listen(port, () => {
  console.log(`project has started at port ${port}`);
});
