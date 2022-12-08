import React from "react";
import { appContext, store, connect } from "./redux";
const App = () => {
  return (
    <appContext.Provider value={store}>
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

// data 里面拿到的 group
const 幺儿子 = connect((state) => {
  return { group: state.group };
})(({ group }) => {
  return (
    <section>
      大姐大
      <div>Group: {group.name}</div>
    </section>
  );
});

const User = connect((state) => {
  return { user: state.user };
})(({ user }) => {
  return <div>User:{user.name}</div>;
});

const UserModifier = connect()(({ dispatch, state, children }) => {
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
