const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

// 유저업무와 관연된 요청이 들어왔을 대 그 요청을 처리하는 역할
router.get('/signup', async (req, res, next) => {
  console.log('user router, singup........')
  userDAO.signup({name: '홍길동', email: 'aaa@naver.com', password: '1234'}, (resp) => {
    res.send(resp)
  })
})
module.exports = router