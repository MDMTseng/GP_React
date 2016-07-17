import { applyMiddleware, combineReducers, createStore } from "redux";
import { calcReducer, userReducer } from "./reducer/calcReducer";
import { stimulator } from "./stimulator";
import * as midware from "./middleware/middleware";
import thunk from 'redux-thunk';

const reducer_C = combineReducers({
  calcData:calcReducer,
  userData:userReducer,
})


const middleware = applyMiddleware(thunk,midware.logger,midware.error_catch);

const store = createStore(reducer_C,{},middleware)

stimulator(store);
