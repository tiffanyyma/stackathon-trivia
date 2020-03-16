const Sequelize = require('sequelize')
const db = require('./db')


const Question = db.define('question', {
  question: {
    type: Sequelize.TEXT,
    // allowNull: false,
  },
  correct_answer: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  incorrect_answers: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  gameId: {
    type: Sequelize.INTEGER,
  },
},
  {
    timestamps: false
  }

)

module.exports = Question
