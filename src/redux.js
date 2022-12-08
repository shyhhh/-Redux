import React, { useState, useContext, useEffect } from "react";
export const connect = () => (Component) => {
  return (props) => {
    const { state, setState } = useContext(appContext);
    const [, update] = useState({});
    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);
    const dispatch = (action) => {
      setState(reducer(state, action));
    };
    return <Component {...props} dispatch={dispatch} state={state} />;
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
