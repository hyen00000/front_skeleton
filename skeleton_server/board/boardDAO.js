const getPool = require('../common/pool')

// 필요한 sql문 등록
const sql = {
  boardList:'SELECT * FROM user WHERE email = ?',

}

const boardDAO={
  // 게시물 조회 요청이 들어왔을 때 router에 의해 실행.dbms
  boardList: async (callback)=>{
    const {name,title,content}=item
    let conn = null
    try{
      console.log('000')
      conn = await getPool().getConnection()
      console.log('111')

      
      if (!board[0]) {
        callback({})
      }else if(result) {
        console.log('333')
        callback({status:200,message:'OK',
      data:{name:board[0].name},title:board[0].title,content:board[0].content})
        }
    }catch(error){
      return{status:500, message:"게시물 입력 실패",error:error}
    }finally{
      if (conn != null) conn.release()
    }
  }
}
module.exports = boardDAO