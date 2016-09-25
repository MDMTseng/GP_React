
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

    WebViewIfx.ToWeb(JSON.stringify({
      url:"BLEModule/ev/connect",
      data:{
        addr:"ADDR11",
        role:"master"
      }
    }));
    WebViewIfx.ToWeb(JSON.stringify({
      url:"BLEModule/ev/disconnect",
      data:{
        addr:"ADDR11"
      }
    }));
  },100);

}
export let GetCommIF=()=>WebViewIfx;

export let WebViewIfAPI={

  SendWebUIStore:(data)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"MainIF/WebUIAPP_Store/POST",
    data:data
  })),

  SendData:(url,data)=>WebViewIfx.FromWeb(JSON.stringify({url,data})),
}
