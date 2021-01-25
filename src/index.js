import React from 'react'
import ReactDOM from 'react-dom'

let memoizedStates = []
let index = 0

function useState (initialState) {
  memoizedStates[index] = memoizedStates[index] || initialState
  let currentIndex = index
  console.log('memoizedStates -> ', memoizedStates)
  
  function setState (newState) {
    memoizedStates[currentIndex] = newState
    render()
  }
  
  return [memoizedStates[index++], setState]
}


function Counter () {
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(1)
  
  
  return (
    <>
      <p>{name} : {number}</p>
      
      <button onClick={() => setName('计数器' + Date.now())}>改名称</button>
      &nbsp;&nbsp;
      <button onClick={() => setNumber(number + 1)}>+点击</button>
    </>
  )
}


function render () {
  index = 0
  ReactDOM.render(
    <Counter/>,
    document.getElementById('root')
  )
}

render()

