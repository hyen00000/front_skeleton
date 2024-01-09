// 이 파일은 dbms를 위해 필요한 connection을 미리 준비하는 파일.
// app에서 db와 연동하기 위해서는 db에 connection해야함.
// db는 내부적으로 connection하기 성능상 상당히 부담됨.
// 그래서 app에서 dbconnection을 한정된 갯수 내에서만 활용할 수 있도록,
// 보통의 경우 connection pool을 운영하고, 
// 그 pool의 connection만 활용하게하는 것이 일반적임.
// 동접자 많으면 순서 대기하도록 하는 것.

//mysql연동 드라이버
const mysql = require('mysql2/promise')

// 앱에서 dbms 작업이 필요하면  이 함수를 호출해서 connection을 얻어 실행.
let pool
module.exports = function getPool(){
  if(pool){
    return pool
  }
  // 초기 pool구성. 즉 초기 connection을 원하는 갯수만큼 만들어서 유지
  const config = {
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit : 10
  }
  return mysql.createPool(config)
}