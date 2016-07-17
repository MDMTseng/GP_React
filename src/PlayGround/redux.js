import { applyMiddleware, combineReducers, createStore } from "redux";

const calcReducer = (state = {ans:0}, action) => {

  switch(action.type)
  {
    case "ADD":
      state.ans += action.data;
    break;
    case "SUB":
      state.ans -= action.data;
    break;
    case "MUL":
      state.ans *= action.data;
    break;
    case "DIV":
      state.ans /= action.data;
    break;
    case "SET":
      state.ans  = action.data;
    break;
  }
  return state;
}
const userReducer = (state = {}, action) => {

  if (action.type === "USER") {
    state.ID=action.data.ID;
    state.Name=action.data.Name;
    return state;
  }
  if(action.type === "ERROR")
  {
    throw new Error("ERROR act");
  }
  return state;
}

const reducer_C = combineReducers({
  calcData:calcReducer,
  userData:userReducer,
})


const logger = (store) => (next) => (action) =>{
  console.log("store :", store);
  console.log("action fired", action);
  next(action)
}

const error_catch = (store) => (next) => (action) =>{
  try{
    next(action)
  }catch(e)
  {
    console.log("ERROR::",e);
  }

}

const middleware = applyMiddleware(logger,error_catch);

const store = createStore(reducer_C,{},middleware)


store.dispatch({type: "SET",data:10000})
store.dispatch({type: "ADD",data:1})
store.dispatch({type: "SUB",data:2})
store.dispatch({type: "MUL",data:3})
store.dispatch({type: "DIV",data:4})
store.dispatch({type: "USER",data:
  {
    ID:Date.now() ,
    Name:"MDM"
  }
})

store.dispatch({type: "ERROR",data:{}})
