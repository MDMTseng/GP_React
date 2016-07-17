
export const logger = (store) => (next) => (action) =>{
  console.log("action fired", action);
  next(action)
}

export const error_catch = (store) => (next) => (action) =>{
  try{
    next(action)
  }catch(e)
  {
    console.log("ERROR::",e);
  }

}
