

module.exports = (sequelize,DataTypes) =>{
    const Answer = sequelize.define("answer", {
        answerText:{
            type:DataTypes.TEXT,
            allowNull:false,
        }
       
        
    })
    return Answer;
}