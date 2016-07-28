
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
