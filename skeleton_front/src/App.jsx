import { Routes, Route } from "react-router-dom";

import Header from './home/component/Header'
import Footer from './home/component/Footer'
import HomeMain from "./home/HomeMain";

const App = () => {
  return (
    <div>
      {/* Header, Footer가 전체 화면에서 항상 고정으로 나온다면 
      아래처럼 각 화면별로 Header, Footer가 상이하게 작용된다면 Route되는 component 내에. */}
      <Header />
      {/* 각 화면이 라우팅되게 등록
      각 업무의 첫 화면만 등록ㄱ하고 그 안에서 화면전환은 중첩라우팅으로 처리
      즉 xxxMain만 이곳에 등록하고 xxx업무에 의한 화면 라우팅은 xxxMain에 중첩라우팅으로 명시 */}
      <Routes>
        <Route path="/" element={<HomeMain />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App