import React from 'react'
import ReactDOM from 'react-dom'

let initialArg = 0
let memoizedState

function useReducer(reducer, initialArg, init) {
  let initialState = void 0
  if (typeof init !== 'undefined') {
    initialState = init(initialArg)
  } else {
    initialState = initialArg
  }
  /*
  * 1.useReducer是useState的内部实现
  * 2.比如说改变状态逻辑复杂的时候，或者下一个状态依赖前一个状态的时候可以使用useReducer
  *
  * */
  memoizedState = memoizedState || initialState
  function dispatch(action) {
    memoizedState = reducer(memoizedState, action)
    render()
  }
  
  return [memoizedState, dispatch]
}

function useState(initialState) {
  return useReducer((oldState, newState) => newState, initialState)
}

function Counter () {
  const [number, setNumber] = useState(0)
  return (
    <>
      <p>{number}</p>
      
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

