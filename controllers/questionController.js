const { where } = require("sequelize");
const { questions } = require("../model");

exports.renderAskQuestionPage = (req, res) => {
  res.render("questions/askQuestion.ejs");
};

exports.askQuestion = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body);

  const userId = req.userId;
  const fileName = req.file.filename; //image
  if (!title || !description) {
    return res.send("please provide title,descripion ");
  }

  await questions.create({
    title,
    description,
    image: fileName,
    userId,
  });
  res.redirect("/");
};

// exports.getAllQuestion = async(req,res)=>{
//     const data = await questions.findAll({

//     })

// }
