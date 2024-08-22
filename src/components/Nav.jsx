import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import { searchFun } from '../redux/SearchSlice'

export default function Nav() {
  let dispatch=useDispatch()

   // search
   function handleSearch(e){
    let text=e.target.value
    axios.get(`${import.meta.env.VITE_API_URL}/products`).then((res)=>{
 
      let dataFilter=res.data.data.filter((e)=>{
          return e.attributes.title.includes(text)
      })
      dispatch(searchFun(dataFilter))
    })
    
    
  }


  return (
    <>
    <nav className="navbar navbar-expand-lg ">
          <div className="container">
            <NavLink to={""} className="navbar-brand" href="#">News</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto d-flex justify-content-center align-items-center g-4">
                <li className="nav-item">
                  <NavLink to={""} className="nav-link-item " aria-current="page" >Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"dashboard"} className="nav-link-item" >Dashboard</NavLink>
                </li>
              </ul>
              <form className="d-flex" role="search">
                     <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onInput={handleSearch}/>
              </form>
            </div>
          </div>
        </nav>

    </>
  )
}
