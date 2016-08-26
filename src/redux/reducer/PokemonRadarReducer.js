import {DISP_EVE_UI} from '../constant';


import {APP_ACT_Type} from '../actions/AppAct';
import {SYS_ACT_Type} from '../actions/SysAct';

//import FastPokeMap_IdMap from '../../../resource/FastPokeMap_IdMap.json';

function Default_PokemonRadarReducer()
{
  return {
    Status:{
      data:[]
    }
  }
}


export var PokemonRadarReducer = (state = Default_PokemonRadarReducer(), action) => {

  if (action.type === APP_ACT_Type.NearByPokemon_UPDATE) {
    let obj={};

    obj.Status=action.data;

    obj.Status.data=obj.Status.data.filter(data=>{
        //console.log(data);
      return ( data!=null && data.rating>0 && data.latitude != undefined );
    });
    return Object.assign({},state,obj);
  }



  return state;
}
