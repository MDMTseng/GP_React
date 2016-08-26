
export let UI_ACT_Type= {
    DROPDOWN_EXPEND: "MENU_EXPEND",
    BODY_PAGE_SWITCH: "BODY_PAGE_SWITCH",
    LOGO_FRAME_SWITCH:"LOGO_FRAME_SWITCH"
}


export let UI_BodyPage= {
    LOG: "LOG",
    RadarView: "RadarView",
    PokeSelectView: "PokeSelectView",
}

export function UIACT_SetMENU_EXPEND(ifExpand)
{
  return {
    type: UI_ACT_Type.DROPDOWN_EXPEND ,data:ifExpand
  }
}

export function UIACT_SwitchBodyPage(page)
{
  return {
    type: UI_ACT_Type.BODY_PAGE_SWITCH ,data:page
  }
}

export function UIACT_LogoFrameSwitch(ifShow)
{
  console.log("UIACT_LogoFrameSwitch:"+ifShow);
  return {
    type: UI_ACT_Type.LOGO_FRAME_SWITCH ,data:ifShow
  }
}
