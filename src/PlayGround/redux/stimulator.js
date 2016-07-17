

import {PromiseX} from '../PromiseX';




function AjaxGet(URL,resCB,rejCB) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 ) {
      if(xhttp.status == 200)
        resCB(xhttp.responseText)
      else
        rejCB({readyState:xhttp.readyState,status:xhttp.status,URL});
    }
  };
  xhttp.open("GET",URL, true);
  xhttp.send();
}






export const stimulator = (store) =>
{
  store.dispatch({type: "SET",data:10000})
  store.dispatch({type: "ADD",data:1})
  store.dispatch({type: "SUB",data:2})
  store.dispatch({type: "MUL",data:3})
  store.dispatch({type: "DIV",data:4})

  store.dispatch((dispatch)=>{

      let URL="http://rest.xlearncode.academy/api/wstern/users";
      let promiseX=PromiseX();
      AjaxGet(URL,promiseX.callBack.res, promiseX.callBack.rej);
      promiseX.promise.then(
        (data)=>{
          if( typeof data === "string")
            data= JSON.parse(data);
          dispatch({type:"ajaxGET",data})
        }
      ).catch((data)=>{
        dispatch({type:"ERROR",data})
      });

  })




}
