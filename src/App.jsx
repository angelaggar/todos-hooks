import { useState, useEffect } from 'react'

export default function App() {
  const [text, setText] = useState('') // el primero es para el valor, el segundo es la funcion que hace algo
  const [todos, setTodos] = useState([])
  // const [doneTasks, setDoneTasks] = useState([]) estaba haciendo pruebas con esto

  useEffect(()=>{
    console.log('Componente termino de renderizar')
  }, []) // el array define de que depende ese efecto, uno es al terminar de renderizar y otro es lo que este alli

  useEffect(()=>{
    console.log('use effect todos', todos)
  }, [todos])

  // cambia cuando cambia el texto del input
  useEffect(()=>{
    console.log('use effect text', text)
  }, [text])

  //se ejecuta cuando cambia texto o todos
  useEffect(()=>{
    console.log('use effect todos & text', todos, text)
  }, [todos, text])

  function addHandler() {
    // const newTodos = [...todos, text]
    // setTodos(newTodos)
    if (text.trim().length > 0) {
      setTodos([text.trim(), ...todos]) //lo anterior pero reducido, ademas se agrega el nuevo elemento hasta arriba
      setText('')
    }
  }

  function keyDownHandler(event) {
    if (event.key === 'Enter') addHandler()
  }

  // Clojures
  function removeItem(index) {
    return () => {
      // const finished = setDoneTasks([item, ...doneTasks]) //lo anterior pero reducido, ademas se agrega el nuevo elemento hasta arriba
      const filtered = todos.filter((item, innerIndex) => index !== innerIndex)
      setTodos(filtered)
    }
  }

  return (
    <main className='min-h-screen bg-neutral-900 text-white p-5 flex flex-col gap-10'>
      <div className='w-full flex justify-center items-center gap-2'>
        <input
          type='text'
          className='bg-white text-black p-2 max-w-sm w-full'
          onKeyDown={keyDownHandler}
          onChange={(event) => {
            setText(event.target.value)
          }}
          value={text}
        />
        <button
          onClick={addHandler}
          className='bg-sky-400 text-black p-2 rounded-md font-bold'
        >
          Agregar
        </button>
      </div>
      <div className='w-full flex flex-col gap-2'>
        {todos.map((item, index) => {
          return (
            <div
              key={`item-${index}`}
              className='w-full flex justify-center items-center gap-2'
            >
              <p className='max-w-sm w-full'>{item}</p>
              <button
                onClick={removeItem(index)}
                className='bg-green-400 text-black p-2 rounded-md font-bold'
              >
                Done
              </button>
            </div>
          )
        })}
      </div>
    </main>
  )
}
