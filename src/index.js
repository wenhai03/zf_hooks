import React from 'react'
import ReactDOM from 'react-dom'

let memoizedState

function useState(initialState) {
  debugger
  memoizedState = memoizedState || initialState
 function setState(newState) {
   memoizedState = newState
 }
  
  return [memoizedState, setState]
}

function Counter () {
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(0)
  return (
    <>
      <p>{name} : {number}</p>
      
      <button onClick={() => setName('计数器' + Date.now())}>改名称</button> &nbsp;&nbsp;
      <button onClick={() => setNumber(number + 1)}>+点击</button>
    </>
  )
}


function render () {
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  )
}
render()

