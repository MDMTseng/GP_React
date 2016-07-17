import { createStore } from "redux";

const reducer = (state, action) => {


  if (action.type === "ADD") {
    state.count += action.data;
    return state;
  }else if (action.type === "SUB") {
    state.count -= action.data;
    return state;
  }else if (action.type === "MUL") {
    state.count *= action.data;
    return state;
  }else if (action.type === "DIV") {
    state.count /= action.data;
    return state;
  }else if (action.type === "SET") {
    state.count = action.data;
    return state;
  }
  return state;
}

const store = createStore(reducer, {count:0})

store.subscribe(() => {
  console.log("store changed", store.getState());
})

store.dispatch({type: "SET",data:10000})
store.dispatch({type: "ADD",data:1})
store.dispatch({type: "SUB",data:2})
store.dispatch({type: "MUL",data:3})
store.dispatch({type: "DIV",data:4})
