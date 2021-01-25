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

function useEffect (callback, dependencies) {
  if (!dependencies) {
    index++
    return callback()
  }
  let lastDependencies = memoizedStates[index]
  let changed = lastDependencies ? !dependencies.every((item, index) => item === lastDependencies[index]) : true
  if (changed) {
    callback()
    memoizedStates[index] = dependencies
  }
  index++
}

function Counter () {
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(1)
  
  useEffect(() => {
    // 解决number每次都打印？？
    console.log('number1 -> ', number)
  }, [])
  
  useEffect(() => {
    // 解决number每次都打印？？
    console.log('number2 -> ', number)
  }, [number])
  
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

