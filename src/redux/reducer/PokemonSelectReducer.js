import {DISP_EVE_UI} from '../constant';


import {APP_ACT_Type} from '../actions/AppAct';
import {SYS_ACT_Type} from '../actions/SysAct';


import {WebViewIfAPI} from '../../WebView_if/Android';
//import FastPokeMap_IdMap from '../../../resource/FastPokeMap_IdMap.json';

function Default_PokemonSelectReducer()
{
  let i=0;
  let obj={
    pokemonSelectList:[]
  };
  for(i=0;i<151;i++)
  {
    obj.pokemonSelectList.push(
      {
      //The pokemon ID starts with 1
          id:i+1,
          rating:5
      }
    );
  }
  return obj;
}


export var PokemonSelectReducer = (state = Default_PokemonSelectReducer(), action) => {

  if (action.type === APP_ACT_Type.PokemonSelelectToggle) {
    let obj={pokemonSelectList:state.pokemonSelectList};
    //The pokemon ID starts with 1
    let arrIdx = action.data-1;
    obj.pokemonSelectList[arrIdx].rating=obj.pokemonSelectList[arrIdx].rating==0? 5 : 0;
    WebViewIfAPI.SendPokemonRegNotiData({
      list:obj.pokemonSelectList.filter((ele)=>(ele.rating>0))
    });
    return Object.assign({},state,obj);
  }

  return state;
}
