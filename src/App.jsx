import React, {useState, useEffect} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo'
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'
import Swal from 'sweetalert2'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === ''){
      Swal.fire({
        icon: 'error',
        title: 'Please enter a valid todo',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false
    })
    Swal.fire({
      icon: 'success',
      title: 'Todo Added',
      showConfirmButton: true,
      timer: 1500
    })
    setInput('')
  }

  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])
  
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
    Swal.fire({
      icon: 'success',
      title: 'Todo Deleted',
      showConfirmButton: true,
      timer: 1500
    })
  }

  return (
    <div className='h-screen w-screen p-4 bg-gradient-to-r from-blue-900 to-blue-500'>
      <div className='bg-slate-100 max-w-[500px] w-full m-auto rounded-lg shadow-xl p-4'>
        <h3 className='text-3xl font-bold text-center p-2 text-gray-800'>Todo App</h3>
        <form onSubmit={createTodo} className='flex justify-between pt-4'>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Add Todo' type='text' className='border p-2 w-full text-xl rounded-lg'/>
          <button className='border p-4 ml-2 bg-orange-400 text-slate-100 rounded-lg hover:bg-green-500'><AiOutlinePlus size={30}/></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
          ))}
        </ul>
        {todos.length > 1 ? (<p className='text-center p-2 text-lg font-semibold'>{`You have ${todos.length} todos`}</p>) : null}
      </div>
    </div>
  )
}

export default App
