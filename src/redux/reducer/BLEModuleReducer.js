
import {APP_ACT_Type} from '../actions/AppAct';
import * as UTIL  from '../../UTIL/MISC_Util';
function Default_UserReducer()
{
  return {
    ScanList:[],
    ConnectionList:[]
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
        return null;
      }


    break;
  }
  return state;
}




const schema_BLEScanList={
    "type": "object",
    "properties": {
        "Name": {"type": "string"},
        "Address": {"type": "string"},
        "RSSI": {"type": "number"},
        "AdvData":{"type": "array"},
        "ScanData":{"type": "array"}
    },
    "required": ["Name", "Address", "RSSI"]
}
const schema_BLEScanList={
    "type": "array",
    "items": schema_BLEScanEle,
    "minItems":1,
    "uniqueItems": true
}
