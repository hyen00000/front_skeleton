const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

const sql = {
  // 이메일 중복을 체크하기 위한 sql.
  // ?는 프로그램 데이터가 들어갈 자리.
  checkId: 'SELECT * FROM user WHERE email =?',
  signup: 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
}

// DAO(Data Acess Object) - dbms(데이터베이스 연동)처리
const userDAO = {
  // item - 클라이언트 요청 데이터
  // callback - dbms가 성공한 후 호출할 개발자 함수
  signup: async (item, callback) => {
    let conn = null
    // 정상적으로 실행될 로직
    try {
      // pool에서 connection 획득 후,
      conn = await getPool().getConnection()
      console.log('dao', item)
      // email check sql 실행
      const [respCheck] = await conn.query(sql.checkId, item.email)
      if (respCheck[0]) {
        // 이메일로 select되는 데이터가 있다면 이미 item.email로 가입된 회원이 있다.
        callback({ status: 500, message: '사용자가 존재합니다.' })
        // 데이터가 없으면 email중복 안된다는 것
      } else {
        // 회원가입하게 table에 insert하면 됨
        //유저 password는 hash문자열로 변형시켜 저장.
        const salt = await bcrypt.genSalt()
        bcrypt.hash(item.password, salt, async (error, hash) => {
          if (error) callback({ status: 500, message: '암호화 실패', error: error })
          else {

            const [resp] = await conn.query(sql.signup, [item.name, item.email, hash])
            callback({ status: 200, message: 'OK', data: resp })
          }
        })
      }
      // 에러 발생시 실행될 로직
    } catch (error) {
      return { status: 500, message: '유저입력실패', error: error }
      // 마지막은 정상 실행되든, 에러가 발생하든, 마지막에 처리할 로직
    } finally {
      if (conn !== null) conn.release()
    }
  },

  login: async(item, callback)=>{
    // 유저입력 데이터 획득.
    const {email,password} = item
    let conn = null
    try{
      console.log('00')
      conn = await getPool().getConnection()
      console.log('11')
      //sql문 실행
      const [user] = await conn.query(sql.checkId,[email])
      console.log('22',user)
      //db에 데이터 없을때. 유저가 잘못 입력함.
      if(!user[0]){
        callback({status:500, message:'아이디, 패스워드를 확인해주세요.'})
      }else{
        // db에 데이터 있을 때. 유저 입력 비밀번화와 db비밀번호 비교
        console.log('33',password,user[0].password)
        //db에 비밀번호가 해시로 되어있어 유저입력 비번을 해시로 만들어 비교해야함.
        bcrypt.compare(password, user[0].password,async(error,result)=>{
          if(error){
            callback({status:500, message:'아이디, 패스워드를 확인해주세요.'})
          }else if(result){
            console.log('44')
            callback({status:200, message:'OK',
          data:{name:user[0].name},email:user[0].email})
          }else{
            callback({status:500, message:'아이디, 패스워드를 확인해주세요.'})
          }
        })
      }
    }catch(error){
      return { status: 500, message: '로그인 실패', error: error }
    }finally{
      if (conn !== null) conn.release()
    }
  }
}

module.exports = userDAO