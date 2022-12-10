import React from "react";
import { Provider, createStore, connect } from "./redux";
import { connectToUser } from "./connecters/connectToUser";

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
const initState = {
  user: { name: "hone", age: 18 },
  group: { name: "哎呀呀" },
};
const store = createStore(reducer, initState);

export const App = () => {
  return (
    <Provider store={store}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </Provider>
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
const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { name: "3秒后的hone" } });
    }, 3000);
  });
};

const fetchUser = (dispatch) => {
  ajax("/user").then((response) => {
    dispatch({ type: "updateUser", payload: response.data });
  });
};
const UserModifier = connect(
  null,
  null
)(({ state, dispatch }) => {
  const onClick = (e) => {
    dispatch(fetchUser);
  };
  return (
    <div>
      <div>User: {state.user.name}</div>
      <button onClick={onClick}>异步获取 user</button>
    </div>
  );
});

export default App;
