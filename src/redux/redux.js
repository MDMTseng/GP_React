import { applyMiddleware, combineReducers, createStore } from "redux";
import { calcReducer, userReducer, UICtrlReducer } from "./reducer/calcReducer";
import { stimulator } from "./stimulator";
import * as midware from "./middleware/middleware";
import thunk from 'redux-thunk';

const reducer_C = combineReducers({
  calcData:calcReducer,
  userData:userReducer,
  UIData:UICtrlReducer,
})


const middleware = applyMiddleware(thunk,midware.logger,midware.error_catch);

export default createStore(reducer_C,{},middleware)
//setTimeout(()=>stimulator(store),1);//off the init thread
