import React, { useState, useContext, useEffect } from "react";
const changed = (oldState, newState) => {
  let changed = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true;
    }
  }
  return changed;
};
export const connect = (selector) => (Component) => {
  return (props) => {
    const { state, setState } = useContext(appContext);
    const [, update] = useState({});
    // 这个 data 就是用户需要的所有数据
    const data = selector ? selector(state) : { state };
    useEffect(
      () =>
        store.subscribe(() => {
          const newData = selector
            ? selector(store.state)
            : { state: store.state };
          if (changed(data, newData)) {
            update({});
          }
        }),
      // 注意这里最好取消订阅，否则在 selector 变化时会出现重复订阅 于是 return
      [selector]
    ); // 一般来说 useEffect 用到了哪些来自于属性的东西都得写在它的依赖里面
    const dispatch = (action) => {
      setState(reducer(state, action));
    };
    return <Component {...props} {...data} dispatch={dispatch} />;
  };
};

export const appContext = React.createContext(null);

export const store = {
  state: {
    user: { name: "hone", age: 18 },
    group: { name: "Jolin" },
  },
  setState(newState) {
    store.state = newState;
    store.listeners.map((fn) => fn(store.state));
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
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
