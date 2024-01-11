const express = require('express')
const router = express.Router()
const boardDAO = require('./boardDAO')

// 유저 요청이 들어오면 실행.
router.get('/boardList', function(req, res, next){
  boardDAO.boardList(data, (resp)=>{
    res.json(resp)
  })
})

router.post('/boardInsert', function(req,res,next){
  boardDAO.insert(data,(resp)=>{
    res.jon(resp)
  })
})

module.exports = router