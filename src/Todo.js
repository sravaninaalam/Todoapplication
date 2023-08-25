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

return(
  <>
    <div className='w-5/12 mx-auto my-20  bg-violet-300 shadow-lg rounded-md'>
          <h1 className='font-bold font-serif text-center my-3 text-2xl text-orange-600'>Make Your Plan Now</h1>
          <form onSubmit={formsubmit}>
              <input required type='text' placeholder='enter note here' className='border border-black m-2 p-2 w-2/3 rounded-md'
              value={input} onChange={(e)=>setInput(e.target.value)}/>
              <button className='bg-blue-400 m-2 py-2 px-4 rounded-lg'>Add</button>
          </form>
         <div className='shadow-lg my-2 py-2'>
              {todos.map((item)=>
                        <div key={item.id}>
                          <h5 className='text-xl my-2 ml-5'>{item.name} 
                              <span className='text-blue-600 mx-2 float-right'><EditTwoToneIcon onClick={()=>editTodo(item.id)} /></span>
                            <span className='text-red-600 mx-2 float-right'><DeleteOutlinedIcon 
                            onClick={()=>deleteTodo(item.id)} /></span></h5>
                        </div>
                   )}
         </div>
          <button className='p-2 my-5 outline outline-red-400 hover:bg-red-400 rounded-lg mx-20'
          onClick={removeAll}>Remove All</button>
    </div>
  </>
)
 }

export default Todo
