
import {APP_ACT_Type} from '../actions/AppAct';
import * as UTIL  from '../../UTIL/MISC_Util';
function Default_UserReducer()
{
  return {
    ScanList:{},
    ConnectionList:{}
  }
}


export var BLEModuleReducer = (state = Default_UserReducer(), action) => {
  if (action.type !== APP_ACT_Type.WebIFData || !action.url.startsWith("BLE"))
  {
    return state;
  }
  let obj={};
  switch(action.url)
  {
    case "BLE/ev/scan_data":
      let dataV = UTIL.JsonValidator.validate(action.data, schema_BLEScanList)
      if(dataV.errors.length!=0)
      {
        console.log(dataV.errors);
        return state;
      }
      for(let BLEScanEle in action.data)
      {
        state.ScanList[BLEScanEle.Address]=BLEScanEle;
      }
    break;

    case "BLE/ev/gatt/connect":
      state.ConnectionList[action.data.Address]=action.data;
    break;

    case "BLE/ev/gatt/disconnect":
      delete state.ConnectionList[action.data.Address];
    break;
  }
  return state;
}




const schema_BLEScanEle={
    "type": "object",
    "properties": {
        "Name": {"type": "string"},
        "Address": {"type": "string"},
        "RSSI": {"type": "number"},
        "AdvData":{"type": "array"},
        "ScanData":{"type": "array"}
    },
    "required": [ "Address", "RSSI"]
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
        "Name": {"type": "string"},
        "Address": {"type": "string"},
        "status": {"type": "number"},
        "AdvData":{"type": "array"},
        "ScanData":{"type": "array"},
    },
    "required": [ "Address", "RSSI"]
}
