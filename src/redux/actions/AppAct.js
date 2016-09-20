import * as UTIL  from '../../UTIL/MISC_Util';

export let APP_ACT_Type= {
  WebIFData:"WebIFData"
}
let schema_WebIFData={
    "type": "object",
    "properties": {
        "url": {"type": "string"}
    },
    "required": ["url"]
}
export function Act_WebIFData(WebIFData)
{
  let dataV = UTIL.JsonValidator.validate(WebIFData, schema_WebIFData)
  if(dataV.errors.length!=0)
  {
    console.log(dataV.errors);
    return null;
  }

  return {
    type: APP_ACT_Type.WebIFData,data:WebIFData
  }
}
