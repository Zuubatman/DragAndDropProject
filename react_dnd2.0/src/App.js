import './App.css';
import React, { useState } from 'react';
import ChoreCard from './ChoreCard';
import { useDrop } from 'react-dnd';

const initialTodoList = [
  {
    id: 1,
    name: 'Dormir',
    status: 'Todo',
  },
  {
    id: 2,
    name: 'Comer',
    status: 'Todo',
  },
  {
    id: 3,
    name: 'Mortal de Costas',
    status: 'Todo',
  },
  {
    id: 4,
    name: 'Acampar',
    status: 'Todo',
  }
]

function App() {
  const [todoList, setTodoList] = useState(initialTodoList)

  const [{ isOverTodo }, dropRefTodo] = useDrop({
    accept: 'chore',
    drop: (item) => {
      let aux = JSON.parse(JSON.stringify(todoList))
      let idx = todoList.findIndex(chore => chore.id === item.id)
      aux[idx].status = 'Todo'
      setTodoList(aux)
    }
    ,
    collect: (monitor) => ({
      isOverTodo: monitor.isOver()
    })
  })

  const [{ isOverDoing }, dropRefDoing] = useDrop({
    accept: 'chore',
    drop: (item) => {
      let aux = JSON.parse(JSON.stringify(todoList))
      let idx = todoList.findIndex(chore => chore.id === item.id)
      aux[idx].status = 'Doing'
      setTodoList(aux)
    }
    ,
    collect: (monitor) => ({
      isOverDoing: monitor.isOver()
    })
  })

  const [{ isOverDone }, dropRefDone] = useDrop({
    accept: 'chore',
    drop: (item) => {
      let aux = JSON.parse(JSON.stringify(todoList))
      let idx = todoList.findIndex(chore => chore.id === item.id)
      aux[idx].status = 'Done'
      setTodoList(aux)
    }
    ,
    collect: (monitor) => ({
      isOverDone: monitor.isOver()
    })
  })

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      <div style={{ width: '33%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid black' }}
        ref={dropRefTodo}
      >
        <h3 style={{ width: '100%' }}>Todo</h3>
        {todoList.map(chore => {
          if (chore.status === 'Todo') {
            return (
              <ChoreCard key={chore.id} id={chore.id} name={chore.name} status={chore.status} />
            )
          } else {
            return null
          }
        })}
        {isOverTodo && <div>UEEPA</div>}
      </div>
      <div style={{ width: '33%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid black' }}
        ref={dropRefDoing}>
        <h3 style={{ width: '100%' }}>Doing</h3>
        {todoList.map(chore => {
          if (chore.status === 'Doing') {
            return (
              <ChoreCard key={chore.id} id={chore.id} name={chore.name} status={chore.status} />
            )
          } else {
            return null
          }
        })}
        {isOverDoing && <div>NOSSASENHORA</div>}
      </div>
      <div style={{ width: '33%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '5px solid black' }}
        ref={dropRefDone}>
        <h3 style={{ width: '100%' }}>Done</h3>
        {todoList.map(chore => {
          if (chore.status === 'Done') {
            return (
              <ChoreCard key={chore.id} id={chore.id} name={chore.name} status={chore.status} />
            )
          } else {
            return null
          }
        })}
        {isOverDone && <div>MEUDEUS</div>}
      </div>
    </div>
  )
}

export default App;