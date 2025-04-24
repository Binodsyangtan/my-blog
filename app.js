const express = require("express");
const { users } = require("./model/index");
const app = express();
//const app = require("express")()

require("./model/index")


//ejs set gareko use ganalai ejs
app.set("view engine", "ejs");

//nodejs lai vaneko frontend form bata kai data aaudaixa telsai bujha
app.use(express.urlencoded({extended:true}))  //serverside rendering

app.use(express.json())  //external like react,vuejs

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("auth/register.ejs");
});

app.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});

app.post("/register",async (req,res)=>{
  // console.log(req.body);
  const {username,email, password} = req.body
  
  //model ko index ma lekheko users
   await users.create({
    username: username,
    password: password,
    email: email
  })
  res.send("register successfully")
})

//nodejs lai vaneko public/css use garna de vanera
//if yo code nalekhe didaina nodejs le access
app.use(express.static("public/css/"));

app.listen(3000, () => {
  console.log("project has started at port 3000");
});
