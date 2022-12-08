import React, {useState, useContext} from 'react'

const appContext = React.createContext(null)
const App = () => {
  // 数据从这里来
  const [appState, setAppState] = useState({
    user: {name: 'hone', age: 18}
  })

  return (
    <appContext.Provider value={{appState, setAppState}}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => <section>大儿子<User/></section>
const 二儿子 = () => <section>二儿子<UserModifier/></section>
const 幺儿子 = () => <section>幺儿子</section>
const User = () => {
  const {appState} = useContext(appContext)
  return <div>User:{appState.user.name}</div>

}
const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      // 这个新的 state 首先会拷贝 user 之外的属性，
      // 创建一个 user, 这个 user 会把之前 user 的其它属性拷贝过来
      // 然后把你给我的额外的对 user 的修改，比如说你要改 name 那就把 name 放到 actionData 里
      // 这是一个完全新的对象，这就规范了创建 state 的过程
      ...state,
      // actionData 里面的数据
      user: {
        ...state.user,
        ...payload
      }
     }
  }
}
const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    setAppState(reducer(appState, {type: 'updateUser', payload: {name: e.target.value}}))
  }
  return <div>
    <input value={appState.user.name}
      onChange={onChange}/>
  </div>
}

export default App
