const jwt =  require("jsonwebtoken")
const { promisify } = require("util");
const { users } = require("../model");

exports.isAuthenticated = async (req, res, next)=> {
  const token = req.cookies.jwttoken;
  console.log("token", token);
  if (!token || token === null || token === undefined) {
    return res.redirect("/login");
  }
  const decryptedResult = await promisify(jwt.verify)(token, "iwantairbuds");
  console.log("decrypted",decryptedResult);
  const data = await users.findByPk(decryptedResult.id)
  if(!data){
    return res.send("No user belongs to that id ")
  }
  req.userId = decryptedResult.id

  next();
};
