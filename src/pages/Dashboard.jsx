import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import del from '../../src/assets/del.svg'
import updat from '../../src/assets/update.svg'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'


export default function Dashboard() {

  

  let [loading,setLoading]=useState(false)
  let [loadingCreate,setLoadingCreate]=useState(false)
  let [loadingUpdate,setLoadingUpdate]=useState(false)

  let[data,setData]=useState([])
  let[post,setPost]=useState("")
  let[Del,setDel]=useState("")
  let[update,setUpdate]=useState("")

  
  let[idProduct,setIdProduct]=useState("")
  let[state,setState]=useState("create")
  let titleEle=useRef()
  let descriptionEle=useRef()
  let priceEle=useRef()
  let urlEle=useRef()
  
  let[url,setUrl]=useState("")
  let[validateTitle,setValidationTitle]=useState("")
  let[validateDescription,setValidationDescription]=useState("")
  let[validateAuthor,setValidationAuthor]=useState("")
  let[validateUrl,setValidationUrl]=useState("")

  let[toast,setToast]=useState("")
  let[toastAuthor,settoastAuthor]=useState("")
  let[toastTitle,settoastTitle]=useState("")
  let[toastDes,settoastDes]=useState("")
  let[toastUrl,settoastUrl]=useState("")

  

  let {dataRedux,stateSearch}=useSelector((state)=>state.SearchReduc)
  

  function emptyForm(){
    titleEle.current.value=""
    descriptionEle.current.value=""
    priceEle.current.value=""
    urlEle.current.value=""
    setUrl(urlEle.current.value)
  }
  // changeUrl
  function handleChangeUrl(e ){

    


    if(urlEle.current.value.trim().length !==0){
      axios.get(`${import.meta.env.VITE_API_URL}/upload/files?filters[url][$eq]=${urlEle.current.value}`).then((res)=>{
        axios.delete(`${import.meta.env.VITE_API_URL}/upload/files/${res.data[0].id}`)
    })}

    
    
    if (e.target?.files[0])
      {
        setLoading(true) ;
        // console.log(e.target?.files[0]);
        
        
        let DataForm=new FormData()
         DataForm.append("files",e.target?.files[0])
        
        axios.post(`${import.meta.env.VITE_API_URL}/upload`,DataForm)
        .then((res)=>{
          urlEle.current.value=res.data[0].url
          setLoading(false) 
          setValidationUrl(/^.+$/g.test(urlEle.current.value));
          setUrl(urlEle.current.value)})
          .catch(error => {
            console.log("erorr")
          })
          settoastUrl("")
          
    }
    
    
    
    
  }
  // checkForm
  function checkForm(){
    
    if(validateTitle=="true" && validateDescription=="true" && validateAuthor=="true" && /^.+$/g.test(urlEle.current.value)){return true}
  }
  // returnValidation
  function returnValidation(state){
    setValidationTitle(state)
    setValidationDescription(state)
    setValidationAuthor(state)
  }
  // create
  function handleCreate(e){
    e.preventDefault()

    
    
    if(checkForm()){
      setLoadingCreate(true) 
              axios.post(`${import.meta.env.VITE_API_URL}/products`,{data:
                {title:e.target.title.value
                  ,description:e.target.description.value
                  ,price:e.target.price.value
                  ,url_image:e.target.url.value}
                    }).then((res)=>{
                        setPost(res.data)
                        setLoadingCreate(false) 
                        setToast("")

                        })
                        
                        console.log('doneeeeee');
                        emptyForm()
                        returnValidation("")
                        settoastUrl("")

                      }
    else{
        console.log(/^.+$/g.test(urlEle.current.value));
        
        if(!/^.+$/g.test(e.target.price.value)){settoastAuthor("Please enter the Author correctly.")}else{settoastAuthor("")}
        if(!/^.+$/g.test(e.target.title.value)){settoastTitle("Please enter the Title correctly.")}else{settoastTitle("")}
        if(!/^.+$/g.test(urlEle.current.value)){settoastUrl("Please Upload Image")}else{settoastUrl("")}
        if(!/^.+$/g.test(e.target.description.value)){settoastDes("Please enter the Description correctly.")}else{settoastDes("")}
        
     
    }
          

    }
  // show data
  function showData(){
    
    
    let data_search=[]
    dataRedux[0]?.map((ele)=>data_search.push(ele))
    // console.log(data_search);


    {stateSearch?
      setData(data_search)
      :
      axios.get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res)=>{
        setData(res.data.data)
        setToast("")

      })
      
    }
    
    
      
    
    
    
  }
  // delte
  function handleDelete(e){

    axios.get(`${import.meta.env.VITE_API_URL}/upload/files?filters[url][$eq]=${e.attributes.url_image}`).then((res)=>{
      axios.delete(`${import.meta.env.VITE_API_URL}/upload/files/${res.data[0].id}`)
      
  })


    axios.delete(`${import.meta.env.VITE_API_URL}/products/${e.id}`).then((res)=>{
      setDel(res.data) })
      setState("create")
      emptyForm()
      returnValidation("")
      settoastDes("")
      settoastUrl("")
      settoastTitle("")
      settoastAuthor("")



  }
  // update (send to form)
  function handleUpdate(id){
    returnValidation("true")
    setState("update")
    setIdProduct(id)
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}?populate=*`).then(res => {
      let{title,description,price,url_image}=res.data.data.attributes
      
      
      titleEle.current.value=title
      descriptionEle.current.value=description
      priceEle.current.value=price
      urlEle.current.value=url_image
      setUrl(urlEle.current.value)
      settoastDes("")
      settoastUrl("")
      settoastTitle("")
      settoastAuthor("")
      

      
    })
    setState("update")
    
  }
  // update btn
  function handleBtnUpdate(){
         
    if(checkForm()){
      setLoadingUpdate(true)
            axios.put(`${import.meta.env.VITE_API_URL}/products/${idProduct}`,
              {data:{
                "title":titleEle.current.value,
                "description":descriptionEle.current.value,
                "price":priceEle.current.value,
                "url_image":urlEle.current.value,
              }}
            ).then(res => {
              setUpdate(res.data)
              setState("create")
              setLoadingUpdate(false)
              setToast("")



              console.log("doneeeeeeeeeee1");
            })
            
            emptyForm()
            returnValidation("")

          }
    
      else{
        
        if(!/^[a-zA-Z0-9\s]+\.?$/g.test(priceEle.current.value)){setToast("Please enter the Author correctly.")}
        else if(!/^[a-zA-Z0-9\s]+\.?$/g.test(titleEle.current.value)){setToast("Please enter the Title correctly.")}
        else if(!/^.+$/g.test(urlEle.current.value)){setToast("Please Upload Image")}
        else if(!/^[a-zA-Z0-9\s]+\.?$/g.test(descriptionEle.current.value)){setToast("Please enter the Description correctly.")}
        
     
    }

    
              
          
  

  
        }
  // validation
  function handleValidation(e){
    let titleText=   titleEle.current.value 
    let desText=   descriptionEle.current.value 
    let authorText=   priceEle.current.value
    if(e.target.name=="title"){
      setValidationTitle(/^.+$/g.test(titleText)?"true":"false");
      settoastTitle(/^.+$/g.test(titleText)?"":"Please enter the Title correctly.");

    } 
    if(e.target.name=="description"){
      setValidationDescription(/^.+$/g.test(desText)?"true":"false");
      settoastDes(/^.+$/g.test(desText)?"":"Please enter the Description correctly.");
    }
    if(e.target.name=="price"){
      setValidationAuthor(/^.+$/g.test(authorText)?"true":"false");
      settoastAuthor(/^.+$/g.test(authorText)?"":"Please enter the Author correctly.");
    }
    
    
    

    
  }
    
  useEffect(()=>{
    showData()
  },[post,Del,update,dataRedux ])



  return (
    <>
        
      

        <section className="inputs">
          <div className="container">
              <form onSubmit={handleCreate} >
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="row g-3">
                      <div className="col-md-12">
                        <input ref={priceEle}
                              type='text'
                              name='price'
                              placeholder='Author'
                              onInput={handleValidation}
                              className={validateAuthor=="true"?"form-control is-valid":
                                validateAuthor=="false"? "form-control is-invalid":"form-control"}
                            />
                            <p className='toastError'>{toastAuthor}</p>

                      </div>
                      <div className="col-md-md-12">
                          <input ref={titleEle}
                              type="text"
                              name="title"
                              placeholder='Write Title ...'
                              onInput={handleValidation}
                              className={validateTitle=="true"?"form-control is-valid":
                                validateTitle=="false"? "form-control is-invalid":"form-control"}
                  
                            />
                            <p className='toastError'>{toastTitle}</p>

                      </div>
                      <div className="col-md-2 ">
                          <div className="wrapper-img">
                            <img  className={url.length==0?"uploadImageHidden" :"uploadImageShow"} 
                            src={url.length==0?null :`${url}`} alt="upload" />
                          </div>
                          


                      </div>
                      <div className="col-6 col-md-5">
                          <div className="fileUpload">
                              <label className="upload  ">
                                  <input   type='file'
                                  
                                          name='url_image' 
                                          onChange={handleChangeUrl}/>
                                          <span className={loading? " spinner-border spinner-border-sm":"d-none"}
                                        role="status" aria-hidden="true"></span>
                                          Upload Image 
                            </label>
                          </div>  
                          <input ref={urlEle}
                              type='text'
                              name='url'
                              className='d-none'
                  
                            />
                      </div>
                      <div className="col-6 col-md-5">
                          <button type="submit"  className={state==="create"?"d-block":"d-none" }>
                          <span className={loadingCreate? " spinner-border spinner-border-sm":"d-none"}
                            role="status" aria-hidden="true"></span>
                            create</button>
                          <button type="button" onClick={handleBtnUpdate} className={state==="update"?"d-block":"d-none" }>
                          <span className={loadingUpdate? " spinner-border spinner-border-sm":"d-none"}
                                        role="status" aria-hidden="true"></span>
                            update</button>  
                      </div>
                    </div>
                      <p className='toastError'>{toastUrl}</p>
                  </div>
                  <div className="col-md-6 ">
                      <textarea ref={descriptionEle}
                                  type='text'
                                  name='description'
                                  placeholder='Write The News.....'
                                  onInput={handleValidation}
                                  className=
                                  {validateDescription=="true"?"form-control is-valid":
                                    validateDescription=="false"? "form-control is-invalid":"form-control"}
                                ></textarea>
                                <p className='toastError'>{toastDes}</p>
                  </div>
                
                </div>
              </form>
          </div>

        </section>
            
        <section className="items">

              <div className="container">
                  <div className={data?.length!==0?"head-list":"d-none"}>
                      <div className="row text-start">
                        <div className="col-1"></div>
                        <div className="col-2 d-none d-md-block"><h3>Author</h3></div>
                        <div className="col-3 offset-1 offset-md-0"><h3>Title</h3></div>
                        <div className="col-3"><h3>Description</h3></div>
                        <div className="col-3"></div>
                      </div>
                    </div>

                  {data?.length!==0?data?.map((e,i)=>{
                    return(
                        <div  key={i} >

                            <div className="row">
                              <div className="col-12">
                                <div className="wrapper">
                                  <div className="row " >
                                    <div className="col-1 ">
                                          <div  className="wrapper-img">
                                            <Link to={`/${e.id}`}>
                                                <img className='image-item' src={`${e.attributes.url_image}`} alt="" />
                                            </Link>
                                          </div>
                                    </div>
                                    <div className="col-2 d-none d-md-block flex-center ">
                                              <h4>{e.attributes.price}</h4>  
                                    </div>
                                    <div className="col-3 offset-1 offset-md-0 flex-center">
                                        <h4>{e.attributes.title}</h4>   
                                    </div>
                                    <div className="col-3 flex-center">
                                          <h4>{e.attributes.description}</h4>   
                                    </div>
                                    <div className="col-3 flex-end justify-content-start justify-content-md-end">
                                      <div className="wrapper-btn">

                                          <button onClick={()=>handleDelete(e)}>
                                            <img src={del} alt="" />
                                          </button>
                                          <button onClick={()=>handleUpdate(e.id)}>
                                            <img src={updat} alt="" />
                                          </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                              
                        </div>
                    )
                  }):<div className='spinner'>
                      <h1 className='no-data'>No content found ...</h1>

                      <div className="spinner-grow" role="status">
                            <span className="sr-only"></span>
                        </div>

                    </div>}
                  
              </div>
        </section>

    </>
  )
}
