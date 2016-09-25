
import BLE_Module_ from './BLE_Module';

let BLEModule= BLE_Module_();

BLEModule.getAPIName=()=>"BLEModule";
export default{
  BLEModule,
};


setTimeout(
  ()=>{
    BLEModule.scan(true);
  },1000);
