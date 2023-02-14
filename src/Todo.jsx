import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const Todo = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <li className={todo.completed ? 'flex justify-between bg-green-400 p-4 my-2 capitalize rounded-lg' : 'flex justify-between bg-slate-200 p-4 my-2 capitalize rounded-lg'}>
      <div className='flex'>
        <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''}/>
        <p onClick={() => toggleComplete(todo)} className={todo.completed ? 'ml-2 cursor-pointer line-through' : 'ml-2 cursor-pointer'}>{todo.text}{todo.completed ? ' Completed' : null}</p>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className='flex items-center'>{<FaRegTrashAlt size={22} className='hover:text-red-500'/>}</button>
    </li>
  )
}

export default Todo