
var WebViewIfx = null;
try{
  WebViewIfx=  WebViewIf;
  WebViewIfx.SystemType="Android";
}
catch(e)
{
  WebViewIfx={
    SystemType:"MOCK",
    FromWeb:(str)=>{console.log("MOCK_WebViewIf_FromWeb"+str);}};
}
mocking();
function mocking()
{
  var latitudeX = 37.334198;
  setTimeout(()=>{
  //  return;
    WebViewIfx.ToWeb(JSON.stringify({
      url:"MainIF/InitWebUI",
      data:{
        reduxStore:{}
      }
    }));
  },100);

}
export let GetCommIF=()=>WebViewIfx;

export let WebViewIfAPI={
  SetServiceEnable:(isEnable)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"MainIF/NotiMonService/enable/"+((isEnable)!=="enable")
  })),

  SetOrientationEnable:(isEnable)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"NotiMonServIF/Orientation/"+((isEnable)?"enable":"disable")
  })),

  SetGPSEnable:(isEnable)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"NotiMonServIF/GPS/enable/"+((isEnable)!=="enable")
  })),

  SendWebUIStore:(data)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"MainIF/WebUIAPP_Store/POST",
    data:data
  })),

}
