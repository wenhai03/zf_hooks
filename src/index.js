import React from 'react'
import ReactDOM from 'react-dom'

let memoizedState
function useState(initialState) {
  memoizedState = memoizedState || initialState
  function setState(newState) {
    memoizedState = newState
    render()
  }
  
  return [memoizedState, setState]
}

function Counter () {
  const [number, setNumber] = useState(0)
  return (
    <>
      <p>{number}</p>
      
      <button onClick={() => {
        setNumber(number + 1)
      }}>+点击</button>
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


