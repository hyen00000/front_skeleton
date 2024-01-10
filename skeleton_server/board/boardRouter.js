const express = reqiure('express')
const router = express.Router()
const boardDAO = require('./boardDAO')

// 유저 요청이 들어오면 실행.
router.get('/boards/insert', function(req, res, next){
  console.log('board router......')
  const data=req.body
  boardDAO.boardList(data, (resp)=>{
    res.send(resp)
  })
})

module.exports = router