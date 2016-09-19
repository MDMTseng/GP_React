import { applyMiddleware, combineReducers, createStore } from "redux";
import * as TestReducer from "./reducer/calcReducer";
import {UICtrlReducer} from "./reducer/UICtrlReducer";
import {SysStateReducer} from "./reducer/SysStateReducer";
import {UserReducer} from "./reducer/UserReducer";
import { stimulator } from "./stimulator";
import * as midware from "./middleware/middleware";
import thunk from 'redux-thunk';



export function ReducStoreSetUp(presistStore){

  const reducer_C = combineReducers({
    sysData:SysStateReducer,
    UIData:UICtrlReducer,
    AppData:combineReducers({
      UserData:UserReducer
    })
  })

  const middleware = applyMiddleware(thunk,midware.logger,midware.error_catch);

   return createStore(reducer_C,presistStore,middleware);
}
