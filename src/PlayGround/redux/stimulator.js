
export const stimulator = (store) =>
{
  store.dispatch({type: "SET",data:10000})
  store.dispatch({type: "ADD",data:1})
  store.dispatch({type: "SUB",data:2})
  store.dispatch({type: "MUL",data:3})
  store.dispatch({type: "DIV",data:4})
  store.dispatch({type: "USER",data:
    {
      ID:Date.now() ,
      Name:"MDM"
    }
  })

  store.dispatch({type: "ERROR",data:{}})
}
