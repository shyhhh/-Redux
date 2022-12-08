import React from "react";
import { appContext, store, connect } from "./redux";
import { connectToUser } from "./connecters/connectToUser";
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

const User = connectToUser(({ user }) => {
  return <div>User:{user.name}</div>;
});
const UserModifier = connectToUser(({ updateUser, user, children }) => {
  const onChange = (e) => {
    updateUser({ name: e.target.value });
  };
  return (
    <div>
      {children}
      <input value={user.name} onChange={onChange} />
    </div>
  );
});

export default App;
