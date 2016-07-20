'use strict';

class dispacher {
    constructor(DispacherName) {
        this.name = DispacherName;
        this._callbacks = {};
        this._isDispatching = false;
        this._isHandled = {};
        this._isPending = {};
        this._pendingType = null;
        this._pendingPayload = null;

        this._lastID = 1;
    }

    register(callback) {
        let id = this.name + this._lastID++;
        this._callbacks[id] = callback;
        return id;
    }

    dispatch(type, payload) {
        if(this._isDispatching)return false;
        
        
        this._startDispatching(type, payload);
        try {
            for (let id in this._callbacks) {
                if (this._isHandled[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        } finally {
            this._endDispatching();
        }
    }
    
    waitFor(ids) {
      if(this._isDispatching == false)return false;
      for( let id of ids)
      {
        if(this._isHandled[id]== undefined )
        { 
          throw "Error: register id: "+id+" not found";
          return false;
        } 
      }
      
      for( let id of ids)
      {
        if(this._isHandled[id] == false)
        {
            if(this._isPending[id] ==true)
            {
                throw "Error: register id: "+id+" has circular dependency detected";
            }
            else
                this._invokeCallback(id);
        }
      }
      
      return true;
    }

    _invokeCallback(id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingType, this._pendingPayload);
        this._isHandled[id] = true;
        this._isPending[id] = false;
    }

    _startDispatching(type, payload) {
        for (let id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingType = type;
        this._pendingPayload = payload;
        this._isDispatching = true;
    }

    _endDispatching() {
        for (let id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = true;
        }
        this._pendingType = null;
        this._pendingPayload = null;
        this._isDispatching = false;
    }
}


var Dispacher=new dispacher("D1_");
export {Dispacher}
