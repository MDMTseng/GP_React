
import * as UTIL  from '../UTIL/MISC_Util';
import {WebViewIfAPI}  from './Android';

function moduleEntity() {
  console.log(this);
  this.ScanList={};
  this.ConnectionList={};
  this.api={
    connect:(addr)=>
      WebViewIfAPI.SendData(this.api.getAPIName()+"/cmd/connect",
      {addr}),
    disconnect:(addr)=>
      WebViewIfAPI.SendData(this.api.getAPIName()+"/cmd/disconnect",
      {addr}),
    dataSend:(addr,uuid,data)=>
      WebViewIfAPI.SendData(this.api.getAPIName()+"/cmd/gatt/data",
      {addr,uuid,data}),
    event_feed:(action)=>null,

    dataGetCB:(addr,uuid,data)=>{},
    cb:(action)=>null,

    advertising:(ifStart)=>
      WebViewIfAPI.SendData(this.api.getAPIName()+"/cmd/advertising/"+ifStart,
      null),
    setProfileTable:(profile)=>
      WebViewIfAPI.SendData(thisv.getAPIName+"/cmd/profileTable",
      profile),

    scan:(ifStart)=>
      WebViewIfAPI.SendData(this.api.getAPIName()+"/cmd/scan/"+ifStart,
      null),
  };
  this.api.event_feed=(action)=>{
    if ( !action.url.startsWith(this.api.getAPIName()+"/ev/"))
    {
      return;
    }
    action.url = action.url.substring(this.api.getAPIName().length+4);

    let dataV;
    switch(action.url)
    {
      case "scan_data":
        dataV = UTIL.JsonValidator.validate(action.data, schema_BLEScanList)
        if(dataV.errors.length!=0)
        {
          console.log(dataV.errors);
          return;
        }
        for(let BLEScanEle in action.data)
        {
          this.ScanList[BLEScanEle.Address]=BLEScanEle;
        }
        this.api.cb(action);
      break;

      case "connect":
        this.ConnectionList[action.data.addr]=action.data;
        this.api.cb(action);
      break;

      case "disconnect":
        delete this.ConnectionList[action.data.addr];
        this.api.cb(action);
      break;

      case "serviceTable":

      break;
      case "gatt/data":
        dataV = UTIL.JsonValidator.validate(action.data, schema_BLEDataPack)
        if(dataV.errors.length!=0)
        {console.log(dataV.errors);return;}
        this.api.cb(action);
        this.api.dataGetCB(action.data.addr,action.data.UUID,action.data.data);
      break;
      default:
        this.api.cb(action);

    }
  }
  return this.api;
};


export default moduleEntity.bind({});

const schema_BLEScanEle={
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "addr": {"type": "string"},
        "RSSI": {"type": "number"},
        "AdvData":{"type": "array"},
        "ScanData":{"type": "array"}
    },
    "required": [ "addr", "RSSI"]
}
const schema_BLEScanList={
    "type": "array",
    "items": schema_BLEScanEle,
    "minItems":1,
    "uniqueItems": true
}
const schema_BLEGattEle={
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "addr": {"type": "string"},
        "role": {"type": "string"},
        "AdvData":{"type": "array"},
        "ScanData":{"type": "array"},
    },
    "required": [ "addr", "role"]
}


const schema_BLEDataPack={
    "type": "object",
    "properties": {
        "addr": {"type": "string"},
        "UUID": {"type": "string"},
        "data":{"type": "array"},
    },
    "required": [ "addr", "UUID","data"]
}
