
const {BaseStore} = require('./BaseStore');
import {DISP_EVE_UI} from '../../constant';

export class UI_store extends BaseStore{
  constructor(){
    super();
    this.DataBase={};
    this.DataBase[DISP_EVE_UI.MENU_CLICKED]=false;
  }

  GetAll()
  {
    return this.DataBase;
  }

  __onDispatch (type,data){
    switch(type)
    {
        case DISP_EVE_UI.MENU_CLICKED:
          if(typeof(data) === "boolean")
          {
            if(this.DataBase[DISP_EVE_UI.MENU_CLICKED]!=data)
            {
              this.DataBase[DISP_EVE_UI.MENU_CLICKED]=!this.DataBase[DISP_EVE_UI.MENU_CLICKED];
              this.__changed = true;
            }
          }

        break;

        case DISP_EVE_UI.UI_Flush:
          this.__changed = true;

        break;
    }
  }
}


var UIStore=new UI_store();
export {UIStore}
