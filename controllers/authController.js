const { users, questions } = require("../model/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.renderHomePage = async (req, res) => {
  const data = await questions.findAll(
    {
      include : [{
        model: users,
        attributes : ["username","email"] //k k need xa tyo matra pathaune
      }]
    }

  ); //findAll return array
  console.log(data);
  

  res.render("home.ejs", { data });
};

exports.renderRegisterPage = (req, res) => {
  res.render("auth/register.ejs");
};

exports.handleRegister = async (req, res) => {
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
};

exports.renderLoginPage = (req, res) => {
  res.render("auth/login.ejs");
};

exports.hanldeLogin = async (req, res) => {
  const { email, password } = req.body;
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
      const token = jwt.sign({ id: data.id }, "iwantairbuds", {
        expiresIn: "30d",
      });
      // console.log("token", token);
      res.cookie("jwtoken", token);

      res.redirect("/");
    } else {
      res.send("Invalid email/password");
    }
  } else {
    res.send("no users with this email");
  }
};
