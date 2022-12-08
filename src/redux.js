import React, { useState, useContext, useEffect } from "react";
export const connect = (selector) => (Component) => {
  return (props) => {
    const { state, setState } = useContext(appContext);
    const [, update] = useState({});
    // 这个 data 就是用户需要的所有数据
    const data = selector ? selector(state) : { state }
    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);
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
