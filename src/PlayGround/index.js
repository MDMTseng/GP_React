/*
export {default as PromiseMess} from './PromiseMess';
export {default as func} from './func';*/

//import PromiseMess from './PromiseMess';
/*import func from './func';*/
//import Redux_ from './redux/redux';
import PromiseXK from '../UTIL/PromiseXK';
console.log(PromiseXK);

var sym=PromiseXK.GetNewID();
PromiseXK.New(sym).promise.
then((x)=>console.log("111"+x)).
catch((x)=>console.log("111_rej_"+x));



var sym2=PromiseXK.GetNewID();
PromiseXK.New(sym2).promise.
then((x)=>console.log("222"+x)).
catch((x)=>console.log("222_rej_"+x));

PromiseXK.Res(sym2,">>res>>222");
PromiseXK.Rej(sym,">>rej>>111");
