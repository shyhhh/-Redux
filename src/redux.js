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
export const connect = (selector, dispatchSelector) => (Component) => {
  return (props) => {
    const dispatch = (action) => {
      setState(reducer(state, action));
    };
    const [, update] = useState({});
    const { state, setState } = useContext(appContext);
    const dispatchers = dispatchSelector
      ? dispatchSelector(dispatch)
      : { dispatch };
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
      [selector]
    );

    return <Component {...props} {...data} {...dispatchers} />;
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
