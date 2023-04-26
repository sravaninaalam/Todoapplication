import React, { useEffect, useState } from 'react'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const getLocalData=()=>{
   const lists= localStorage.getItem("mytodos")
   if(lists){
    return JSON.parse(lists)
   }
   else{
    return[]
   }
}


const Todo = () => {
  const[input,setInput]=useState("")
  const[todos,setTodos]=useState(getLocalData())
  const[isedit,setIsedit]=useState(null)
  const formsubmit=(e)=>{
     e.preventDefault()
     if(input && isedit){
        setTodos(
          todos.map((item)=>{
            if(item.id===isedit){
              return {...item,name:input}
            }
            return item
          })
        )
        setInput("")
        setIsedit(null)
     }
     else{
     const newinput={
      id:new Date().getTime().toString(),
      name:input
     }
     setTodos([...todos,newinput])
     setInput('')
    }
  }
 const deleteTodo=(ind)=>{
      const newtodo=todos.filter((item)=>item.id!==ind)
      setTodos(newtodo)
 }
 const editTodo=(ind)=>{
      const edittodo=todos.find((item)=>item.id===ind)
      setInput(edittodo.name)
      setIsedit(ind)
 }
 const removeAll=()=>{
    setTodos([])
 }
 useEffect(()=>{
     localStorage.setItem("mytodos",JSON.stringify(todos))
 },[todos])
  return (

  <>
    <div className='container pt-5'>
       <div className='col-md-12'>
         <div className='card' style={{background:"lightblue"}}>
            <div className='card-body'>
               <h1 className='card-title'>Make Your Plan Now</h1>
                    <form onSubmit={formsubmit}>
                      <input required type='text' placeholder='enter your note here' value={input} onChange={(e)=>setInput(e.target.value)}/>
                      &nbsp;
                      <button type='submit'>{isedit?"EDIT":"ADD"}</button>
                       {/* <input type="submit" value="ADD" name="ADD"/> */}
                    </form>
                  
                  {todos.map((item)=>
                  <div key={item.id}>
                     <br/> <h5>{item.name}  &nbsp;&nbsp; 
                         &nbsp; <EditTwoToneIcon onClick={()=>editTodo(item.id)} style={{color:"blue",marginRight:"10%"}} className='float-end'/>
                         &nbsp; <DeleteOutlinedIcon onClick={()=>deleteTodo(item.id)} style={{color:"red"}}className='float-end'/></h5>
                  </div>
                   )}
                   <br></br><button className='btn btn-danger' onClick={removeAll}>RemoveAll</button>
             </div>
         </div>
       </div>
    </div>
    </>
  )
}

export default Todo
