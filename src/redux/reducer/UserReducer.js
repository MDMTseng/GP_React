import {DISP_EVE_UI} from '../constant';


import {APP_ACT_Type} from '../actions/AppAct';
import {SYS_ACT_Type} from '../actions/SysAct';

function Default_UserReducer()
{
  return {
    Status:false,
    orientation :{
      x:0,
      y:0,
      z:0
    },
    GPS :{
      status:0,
      longitude:0,
      latitude:0
    }
  }
}

const DEG2RAD = Math.PI/180;

export var UserReducer = (state = Default_UserReducer(), action) => {

  if (action.type === SYS_ACT_Type.SERVICE_STATUS_UPDATE) {

    let obj={};
    switch(action.data.sysUrl)
    {
      case ".service.Orientation_status":

        if(action.data.value.status!=2)break;
        obj.orientation={};
        obj.orientation.x = action.data.value.x*DEG2RAD;
        obj.orientation.y = action.data.value.y*DEG2RAD;
        obj.orientation.z = action.data.value.z*DEG2RAD;


        return Object.assign({},state,obj);
        break;
      case ".service.GPS_status":
        if(action.data.value.status!=2)break;
        //console.log("LOCATION update>>>>");
        obj.GPS = action.data.value;
        return Object.assign({},state,obj);
        break;
    }
  }
  return state;
}