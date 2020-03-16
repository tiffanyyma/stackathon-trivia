const router = require('express').Router()
const axios = require('axios')
const Sequelize = require('sequelize')
module.exports = router

const Question = require('../db/question')

//get questions for game
router.get('/:gameId', async (req, res, next) => {
  try {
    const gameId = req.params.gameId;
    const questions = await Question.findAll({
      where: {gameId: gameId}
    })
    //NOTE: sending product objects with all their information intact.
    console.log("i'm in the get route")
    res.json(questions)
  } catch (err) {
    next(err)
  }
})


// create game
router.post('/', async (req, res, next) => {
  try {
    //get the questions
    const {data} = await axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')

    //return for highest gameId
    const maxGameId = await Question.max('gameId')

    data.results.forEach( async obj => {
      await Question.create({
        question: obj.question,
        correct_answer: obj.correct_answer,
        incorrect_answers: obj.incorrect_answers,
        gameId: maxGameId+1
      })
    })
    res.json({gameId: maxGameId+1})

  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


