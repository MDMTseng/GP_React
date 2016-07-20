
const {BaseStore} = require('./BaseStore');
import {DISP_EVE_UI} from '../constant';

export class storeT1 extends BaseStore{
  constructor(){
    super();
    this.DataBase[DISP_EVE_UI.MENU_CLICKED]=false;
  }

  GetAll()
  {
    return this.DataBase;
  }

  __onDispatch=(type,data)=> {
    switch(type)
    {
        case DISP_EVE_UI.MENU_CLICKED:
          this.DataBase[DISP_EVE_UI.MENU_CLICKED]!=this.DataBase[DISP_EVE_UI.MENU_CLICKED];
          console.log("XXXXXXXX  DISP_EVE_UI  XXXXXXXXXX");
          console.log(data);
        break;
    }
  }

}
