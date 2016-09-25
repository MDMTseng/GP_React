//TODO...
import PromiseX from './PromiseX';
let keyRespSetPool={};
let ID_Iter=0;
var PromiseXK={
  GetNewID:()=>"PXKcb_"+ID_Iter++,
  New: function(idStr,timeout_ms=5000){
    return PromiseXK.Set(PromiseX(),idStr,timeout_ms=5000);
  },

  Set: function(promiseX,idStr,timeout_ms=5000){
    if (typeof keyRespSetPool[idStr] !== "undefined") {
     return null;
    }
    let keyRespSet={promiseX,idStr};
    keyRespSet.timeout=setTimeout(function(){
      PromiseXK.Rej(idStr,null);
    },timeout_ms);
    keyRespSetPool[idStr]=keyRespSet;
    return promiseX;
  },

  Res : function(idStr,data){
    let keyRespSet =keyRespSetPool[idStr];
    if (typeof keyRespSet == "undefined") { return null;}
    delete keyRespSetPool[idStr];
    clearTimeout(keyRespSet.timeout);
    return keyRespSet.promiseX.callBack.res(data);
  },

  Rej : function(idStr,data){
    let keyRespSet =keyRespSetPool[idStr];
    if (typeof keyRespSet == "undefined") { return null;}
    delete keyRespSetPool[idStr];
    clearTimeout(keyRespSet.timeout);
    return keyRespSet.promiseX.callBack.rej(data);
  }
}
export default PromiseXK;
