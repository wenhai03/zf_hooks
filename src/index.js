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
/*
* 在函数主体中，不能具有副作用的逻辑，订阅，定时器修改DOM
* useEffect 给函数组件添加了操作副作用的
* 类组件 didmount didupdate willunmount
*
* */
let lastDependencies

function useEffect (callback, dependencies) {
  if (!dependencies) return callback()
  let changed = lastDependencies ? !dependencies.every((item, index) => item === lastDependencies[index]) : true
  if (changed) {
    callback()
    lastDependencies = dependencies
  }
}

function Counter () {
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(1)
  
  useEffect(() => {
    // 解决number每次都打印？？
    console.log('number -> ', number)
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

