
import {DISP_EVE_UI} from '../constant';

export function UIACT_SetMENU_EXPEND(ifExpand)
{
  return {
    type: DISP_EVE_UI.MENU_EXPEND ,data:ifExpand
  }
}
export function UIACT_SetInputBar(text)
{
  return {
    type: DISP_EVE_UI.INPUT_BAR,data:text
  }
}

export function UIACT_SystemChange(data)
{
  if(data.sysUrl === undefined||data.value === undefined)
  {
    throw new Error('UIACT_SystemChange data format error');
  }
  return {
    type: DISP_EVE_UI.UPDATE_SYS_CHANGE,data:data
  }
}
