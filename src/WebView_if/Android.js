


WebViewIf.ToWeb = (obj)=>{
  console.log("@@@@@@@@"+JSON.stringify(obj));
};
if(false)
  WebViewIf={
    FromWeb:(text)=> console.log(text),
    __ToWeb:(text)=> console.log(text)
  }
export default WebViewIf;
