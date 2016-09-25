
import * as UIAct from '../redux/actions/UIAct';
import * as SysAct from '../redux/actions/SysAct';
import * as AppAct from '../redux/actions/AppAct';

import PromiseX from '../UTIL/PromiseX';

import {WebViewIfAPI} from './Android';

import ModuleMan from './ModuleMan';

let Store =null;


let StoreInitDataPromiseX=PromiseX();
//setTimeout(StoreInitDataPromiseX.callBack.rej,2000);

let ToWeb = (json)=>{
  console.log(json);
  let obj=JSON.parse(json);

  if(obj.url === "NotiMonServIF/PokemonUpdateNotify")
  {
    /*WebViewIfx.FromWeb(
      JSON.stringify({url:"NotiMonServIF/GET/NearByPokemon"})
    );*/
    Store.dispatch(AppAct.Act_NearByPokemonUpdate(obj.data));
    return;
  }

  if(obj.url === "NotiMonServIF/GET/NearByPokemon/RSP")
  {
    //Store.dispatch(ACT_UI.UIACT_SetInputBar(obj.data.pokemon.length));
    return;
  }

  if(obj.url === "MainIF/SystemStatusChange")
  {

    Store.dispatch(SysAct.Act_StatusUpdate(obj.data));
  //  console.log("@@@@@@@@"+json);
    return;
  }

  if(obj.url === "MainIF/InitWebUI")
  {
    console.log("MainIF/InitWebUI>>>>"+json);
    StoreInitDataPromiseX.callBack.res(obj.data);
    return;
  }

  if(obj.url === "MainIF/WebUIAPP_Store/GET")
  {
    WebViewIfAPI.SendWebUIStore({
      reduxStore:Store.getState()
    });
    return;
  }


  if(obj.url === "MainIF/WebUIAPP_Store/GET")
  {
    WebViewIfAPI.SendWebUIStore({
      reduxStore:Store.getState()
    });
    return;
  }
  if(obj.url.startsWith(ModuleMan.BLEModule.getAPIName()))
  {
    ModuleMan.BLEModule.event_feed(obj);
    return;
  }


};

export let SetCommIF=(CommIF)=>{CommIF.ToWeb=ToWeb;};
export let StoreInitDataPromise=StoreInitDataPromiseX.promise;
export let SetReduxStore=(ReduxStore)=>{Store=ReduxStore;};
