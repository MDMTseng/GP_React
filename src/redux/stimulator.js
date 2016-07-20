

import {PromiseX} from '../PromiseX';

import jsonp from 'jsonp';
import querystring from 'querystring';


function AjaxGet(URL,resCB,rejCB) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 ) {
      if(xhttp.status == 200)
      {
        let data=xhttp.responseText;
        data= JSON.parse(data);
        resCB(data);
      }
      else
        rejCB({readyState:xhttp.readyState,status:xhttp.status,URL});
    }
  };
  xhttp.open("GET",URL, true);
  xhttp.send();
}

function jsonpGet(URL,resCB,rejCB) {
  jsonp(URL,  (err, data) => {
    if (err)
    {
      rejCB(err)
      throw err;
    }
    resCB(data);
  });
}





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
