import {Route,Routes} from 'react-router-dom'
import BoardList from './component/BoardList'


const BoardMain = () =>{
  return(
    <div>
      <h2>Board Main</h2>
      <Routes>
        <Route path='/insert' element={<BoardList/>} />
      </Routes>
    </div>
  )
}
export default BoardMain