import Home from "./component/Home";

const HomeMain=()=>{
  return(
    <div>
      <Home/>
      {/* 의미 없는 컴포넌트가 선언된 것처럼 보이지만
      무언가의 상황에따라 홈 화면을 위한 컴포넌트가 포함될 수 있고
      홈 화면 내에 중첩 라우팅으로.. */}
    </div>
  )
}
export default HomeMain