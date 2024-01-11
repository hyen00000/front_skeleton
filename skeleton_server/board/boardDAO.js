const getPool = require('../common/pool')

// 필요한 sql문 등록
const sql = {
  boardList: 'SELECT * FROM board',
  insert: 'INSERT INTO boardTbl(id, name, title, content, cnt, createAt) VALUSE (?, ?, ?, ?, ?, ?)',

}

const boardDAO = {
  // 게시물 조회 요청이 들어왔을 때 router에 의해 실행.dbms
  boardList: async (callback) => {
    const { name, title, content } = item
    let conn = null
    try {
      conn = await getPool().getConnection()
      const [resp] = await conn.query(sql.boardList, [])

      callback({ status: 200, message: 'OK', data: resp })
    } catch (error) {
      return { status: 500, message: "조회 실패", error: error }
    } finally {
      if (conn != null) conn.release()
    }
  },
  
  insert: async (item, callback) => {
    let conn = null
    // 정상적으로 실행될 로직
    try {
      // pool에서 connection 획득 후,
      conn = await getPool().getConnection()
      //sql 실행
      const [resp] = await conn.query(sql.insert)

        // 개시물 insert
            const [board] = await conn.query(sql.insert, [item.name, item.title, item.content])
            callback({ status: 200, message: 'OK', data: resp })
          
      // 에러 발생시 실행될 로직
    } catch (error) {
      return { status: 500, message: '게시물 입력 실패', error: error }
      // 마지막에 처리할 로직
    } finally {
      if (conn !== null) conn.release()
    }
  }
}

module.exports = boardDAO