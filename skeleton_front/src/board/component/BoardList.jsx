import React,{useCallback, useState} from 'react'
import { useNavigate } from 'react-router'
import axios from'axios'

const BoardList = () => {

  const Navigate = useNavigate()

  const [data, setData] = useState({name:'',title:'',content:''})

  const ChangeData = useCallback((e)=>{
    setData((data)=>({...data,[e.target.name] : e.target.value}))
  })
  
  const insert = useCallback(async (e)=>{
    e.preventDefault();
    const resp = await axops.post("http://localhost:8000/boards/insert",data)
    if(resp.data.status ===500) window.alert(resp.data.message)
    else Navigate('/boards')
  },[data, navigate])

  return (
    <main id="main">
      {/* <!-- ======= Intro Single ======= --> */}
      <section class="intro-single">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-8">
              <div class="title-single-box">
                <h1 class="title-single">Our Amazing Properties</h1>
                <span class="color-text-a">Grid Properties</span>
              </div>
            </div>
            <div class="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Properties Grid
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section class="property-grid grid">
        <div class="container">
          <div class='row'>
            <div class='col-sm-12'>
              <table class='table table-striped'>
                <thead>
                  <rt>
                    <th>번호</th>
                    <th>타이틀</th>
                    <th>이름</th>
                    <th>작성일</th>
                    <th>조회수</th>
                  </rt>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} class="text-end">
                      <button>조회</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BoardList