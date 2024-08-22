import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardDetails from '../components/CardDetails'

export default function Details() {
    let[data,setData]=useState([])
    let{id}=useParams()
    function showData(){
        axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
        .then((res)=>{
          setData(res.data.data)
            console.log(res.data.data);
            
        })
        .catch((error)=>{console.log("erro")} )
        
      }
    useEffect(()=>{ 
        showData()
    },[])
  return (
    <>
    {data.length!==0?
        <CardDetails info={data}/>
        :null
    }
    </>
  )
}
