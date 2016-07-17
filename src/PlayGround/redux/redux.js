import { applyMiddleware, combineReducers, createStore } from "redux";
import { calcReducer, userReducer } from "./reducer/calcReducer";
import { stimulator } from "./stimulator";
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

stimulator(store);
