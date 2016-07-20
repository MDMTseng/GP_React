

import {PromiseX} from '../UTIL/PromiseX';



export const stimulator = (store) =>
{
  store.dispatch({type: "SET",data:10000})
  store.dispatch({type: "ADD",data:1})
  store.dispatch({type: "SUB",data:2})
  store.dispatch({type: "MUL",data:3})
  store.dispatch({type: "DIV",data:4})

  store.dispatch((dispatch)=>{
      let promiseX=PromiseX();
      //let URL="http://rest.xlearncode.academy/api/wstern/users";

      let URL="http://jsfiddle.net/echo/jsonp/?"+
      querystring.encode({
        XX:100
      });
      jsonpGet(URL,promiseX.callBack.res, promiseX.callBack.rej);
      promiseX.promise.then((data)=>{
        dispatch({type:"ajaxGET",data})
      }).catch((data)=>{
        dispatch({type:"ERROR",data})
      });
  })
}
