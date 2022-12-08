import React, { useState, useContext, Children } from "react";

const appContext = React.createContext(null);
const App = () => {
  // 数据从这里来
  const [appState, setAppState] = useState({
    user: { name: "hone", age: 18 },
  });

  return (
    <appContext.Provider value={{ appState, setAppState }}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  );
};
const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier>内容</UserModifier>
  </section>
);
const 幺儿子 = () => <section>幺儿子</section>;
const User = () => {
  const { appState } = useContext(appContext);
  return <div>User:{appState.user.name}</div>;
};
const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    };
  }
};
const connect = (Component) => {
  return (props) => {
    const { appState, setAppState } = useContext(appContext);
    const dispatch = (action) => {
      setAppState(reducer(appState, action));
    };
    return <Component {...props} dispatch={dispatch} state={appState} />;
  };
};

// connect 的作用就是将这个组件与全局状态连接起来
const UserModifier = connect(({ dispatch, state, children }) => {
  const onChange = (e) => {
    dispatch({ type: "updateUser", payload: { name: e.target.value } });
  };
  return (
    <div>
      {children}
      <input value={state.user.name} onChange={onChange} />
    </div>
  );
});

export default App;
