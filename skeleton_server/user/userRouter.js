const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

// 유저업무와 관연된 요청이 들어왔을 대 그 요청을 처리하는 역할
router.post('/signup', async (req, res, next) => {
  console.log('user router, singup........')
  // front전달 데이터 획득
  const data =req.body
  userDAO.signup(data, (resp) => {
    res.send(resp)
  })
})
module.exports = router