import {DISP_EVE_UI} from '../constant';

import {SYS_ACT_Type} from '../actions/SysAct';


function Default_SysState()
{
  return {
    systemStatus:{},
    serviceStatus:'disable',
    system_log:".INIT",
    GPSStatus:'disable',
    orientationStatus:'disable',
  };
}


export var SysStateReducer = (state = Default_SysState(), action) => {

  if (action.type === SYS_ACT_Type.SERVICE_STATUS_UPDATE) {
    let obj={};
    switch(action.data.sysUrl)
    {
      case ".activity.serviceRunning":
        state.serviceStatus=(action.data.value)?'enable':'disable';
        if(!action.data.value)
        {
          state.orientationStatus=
          state.GPSStatus = 'disable';
        }
        return Object.assign({},state,obj);
        break;

      case ".service.GPS_status":

        if((state.GPSStatus==='enable'  && action.data.value.status==2)||
           (state.GPSStatus==='disable' && action.data.value.status!=2)
        )
            return state;
        state.GPSStatus=(action.data.value.status==2)?'enable':'disable';
        return Object.assign({},state,obj);
        break;

      case ".service.Orientation_status":
        if((state.orientationStatus==='enable'  && action.data.value.status==2)||
           (state.orientationStatus==='disable' && action.data.value.status!=2)
        )
            return state;

        state.orientationStatus=(action.data.value.status==2)?'enable':'disable';
        return Object.assign({},state,obj);
        break;

      case ".service":
        state.GPSStatus=(action.data.value.GPS_status.status==2)?'enable':'disable';
        state.orientationStatus=(action.data.value.Orientation_status.status==2)?'enable':'disable';
        return Object.assign({},state,obj);
        break;
    }

    return Object.assign({},state,obj);
  }

  return state;
}
