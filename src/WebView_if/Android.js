
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
//mocking();
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
  //return;
  setTimeout(()=>{

    WebViewIfx.ToWeb(JSON.stringify({
      url:"MainIF/SystemStatusChange",
      data:{
        sysUrl:".CommSYS",
        value:WebViewIfx.SystemType
      }
    }));

    WebViewIfx.ToWeb(JSON.stringify({
      url:"MainIF/SystemStatusChange",
      data:{
        sysUrl:".service.Orientation_status",
        value:{
          status:2,
          x:37.334198,
          y:37.334198,
          z:37.334198,
        }
      }
    }));

    WebViewIfx.ToWeb(JSON.stringify({
      url:"NotiMonServIF/PokemonUpdateNotify",
      data:{"data":[
        {"rating":5,"deviceId":"bt3ffze7axoyyc3h0pcrtvab424jfywg","averageRating":50,"geohash":"9q5cnwx9x","latitude":37.335298,"trainerName":"illy23","pokemonId":59,"id":"HkJXjBHF","longitude":-121.885670,"geohash2":"9q","downvotes":0,"geohash4":"9q5c","score":4627758595278,"geohash6":"9q5cnw","userId":"704174","upvotes":1,"created":1470614294},
        {"rating":5,"deviceId":"fdb1d3a055da11e693a6651f99289d9a","averageRating":50,"geohash":"9qh1b54ny","latitude":37.334198,"trainerName":"(Anonymous)","pokemonId":9,"id":"BkehGirSK","longitude":-121.885570,"geohash2":"9q","downvotes":0,"geohash4":"9qh1","score":4627758592928,"geohash6":"9qh1b5","userId":"BkHSwLYd","upvotes":1,"created":1470614292},
        null,//a null data test
        {"rating":5,"deviceId":"80sxy0vumg2h5hhv8hgc0axt9jr29al7","averageRating":50,"geohash":"9q8ywqvde","latitude":37.333098,"trainerName":"(Poke Radar Prediction)","pokemonId":51,"id":"rkxizsrHF","longitude":-121.886670,"geohash2":"9q","server_secret":"supersecure","downvotes":0,"geohash4":"9q8y","score":4627758591703,"geohash6":"9q8ywq","userId":"13661365","upvotes":1,"created":1470613921}]}
    }));

    setTimeout(()=>{
      latitudeX+=0.00003;
      WebViewIfx.ToWeb(JSON.stringify({
        url:"MainIF/SystemStatusChange",
        data:{
          sysUrl:".service.Orientation_status",
          value:{
            status:2,
            x:latitudeX*100000,
            y:37.334198,
            z:37.334198,
          }
        }
      }));

      WebViewIfx.ToWeb(JSON.stringify({
        url:"MainIF/SystemStatusChange",
        data:{
          sysUrl:".service.GPS_status",
          value:{
            status:2,
            latitude:latitudeX,
            longitude: -121.885670
          }
        }
      }));
    },100);
  },4000);
}
export let GetCommIF=()=>WebViewIfx;

export let WebViewIfAPI={
  SetServiceEnable:(isEnable)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"MainIF/NotiMonService/enable/"+((isEnable)!=="enable")
  })),

  SetOrientationEnable:(isEnable)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"NotiMonServIF/Orientation/enable/"+((isEnable)!=="enable")
  })),

  SetGPSEnable:(isEnable)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"NotiMonServIF/GPS/enable/"+((isEnable)!=="enable")
  })),

  SendPokemonRegNotiData:(data)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"NotiMonServIF/pokemonselect/set/",
    data:data
  })),
  SendWebUIStore:(data)=>WebViewIfx.FromWeb(JSON.stringify({
    url:"MainIF/WebUIAPP_Store/POST",
    data:data
  })),

}
