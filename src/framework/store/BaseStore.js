
import {Dispacher} from '../Dispacher';

import {EventEmitter} from 'events';

export class BaseStore {


  constructor() {
    this.__className = this.constructor.name;
    this.__changed = false;
    this.__changeEvent = 'change';
    this.__emitter = new EventEmitter();
    this.__dispatcher = Dispacher;
    this._dispatchToken = (Dispacher.register( (type,payload) => {this.__invokeOnDispatch(type,payload);} ));
    //this._dispatchToken = Dispatcher.register( (payload) => {this.__invokeOnDispatch(payload);} );
  }
  addListener(callback) {
    return this.__emitter.on(this.__changeEvent, callback);
  }

  getDispatcher() {
    return his.__dispatcher ;
  }

  /**
   * This exposes a unique string to identify each store's registered callback.
   * This is used with the dispatcher's waitFor method to devlaratively depend
   * on other stores updating themselves first.
   */
  getDispatchToken() {
    return this._dispatchToken;
  }

  /**
   * Returns whether the store has changed during the most recent dispatch.
   */
  hasChanged() {
    return this.__changed;
  }

  __emitChange() {

    this.__changed = true;
  }

  /**
   * This method encapsulates all logic for invoking __onDispatch. It should
   * be used for things like catching changes and emitting them after the
   * subclass has handled a payload.
   */
  __invokeOnDispatch(type,payload) {
    this.__changed = false;
    this.__onDispatch(type,payload);
    if (this.__changed) {
      this.__emitter.emit(this.__changeEvent);
    }
  }

  /**
   * The callback that will be registered with the dispatcher during
   * instantiation. Subclasses must override this method. This callback is the
   * only way the store receives new data.
   */
  __onDispatch(type,data) {
    console.log(type,data);
  }
}
