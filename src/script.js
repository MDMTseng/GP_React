'use strict'

import styles from '../style/basis.css'
import sp_style from '../style/sp_style.css'


import * as XXXXXX from './PlayGround/index';
import {ReducStoreSetUp} from './redux/redux';
import {GetCommIF,WebViewIfAPI} from './WebView_if/Android';
import * as inputFlow from './WebView_if/input_flow';
import PromiseX from './UTIL/PromiseX';
import * as MISC_Util from './UTIL/MISC_Util';
let StoreRestorePromise=PromiseX();

let Store = null;
inputFlow.SetCommIF(GetCommIF());
inputFlow.StoreInitDataPromise.then((StoreData)=>{
  console.log("inputFlow.StoreInitDataPromise.then");
  Store= ReducStoreSetUp(StoreData.reduxStore);
  inputFlow.SetReduxStore(Store);
  StoreRestorePromise.callBack.res(Store);

  setTimeout(()=>{
    //WebViewIfAPI.SetServiceEnable(true);
  },200);

})


import React from 'react';
import ReactDOM from 'react-dom';
import $CSSTG  from 'react-addons-css-transition-group';
import * as BASE_COM from './component/baseComponent';
import * as UIAct from './redux/actions/UIAct';
import * as APPAct from './redux/actions/AppAct';
import * as SysAct from './redux/actions/SysAct';


class SideControlComponent extends React.Component{

    constructor(props) {
      super(props);
      this.state =Store.getState();
    }
    componentWillMount()
    {
      this.unSubscribe=Store.subscribe(()=>
      {
          this.setState(Store.getState());
      });
    }

    componentWillUnmount()
    {
      this.unSubscribe();
      this.unSubscribe=null;
    }
    shouldComponentUpdate(nextProps, nextState) {

        return this.state.UIData !=nextState.UIData||
        this.state.sysData!=nextState.sysData;
    }
    handleServiceSwitch(){

        WebViewIfAPI.SetServiceEnable(this.state.sysData.serviceStatus);
    }

    handleOrientationSwitch(){
        WebViewIfAPI.SetOrientationEnable(this.state.sysData.orientationStatus);
    }


    handleGPSSwitch(){
        WebViewIfAPI.SetGPSEnable(this.state.sysData.GPSStatus);
    }

    handlePageTabClick(){
      Store.dispatch(UIAct.UIACT_SwitchBodyPage(this));
      Store.dispatch(UIAct.UIACT_SetMENU_EXPEND(!Store.getState().UIData.MENU_EXPEND))
    }
    render() {
      let BtnColor={
        ["disable"]:"lred",
        ["enable"]:"lgreen",
        ["disable-pending"]:"lgray",
        ["enable-pending"]:"lgray",

      }
      //console.log(this.state.sysData);
      //let ifHide = (this.state.UIData.MENU_EXPEND)?"":"hide";
      return(

            <BASE_COM.CardFrameWarp addClass="width10 overlay veleXY fadeIn sideCtrl"
              boxShadow="  0px 15px 36px 4px rgba(0,0,0,0.75)">
              <h className="vbox black">Setting</h>
              <button className={"vbox width4 "+BtnColor[this.state.sysData.serviceStatus]} onClick={this.handleServiceSwitch.bind(this)}>Service</button>
              <button className={"vbox width4 "+BtnColor[this.state.sysData.orientationStatus]} onClick={this.handleOrientationSwitch.bind(this)}>Rotate</button>
              <button className={"vbox width4 "+BtnColor[this.state.sysData.GPSStatus]} onClick={this.handleGPSSwitch.bind(this)}>GPS</button>

              <div className="HX0_1"></div>
              <h className="vbox black">Page</h>
              <button className="sidebar" onClick={this.handlePageTabClick.bind(UIAct.UI_BodyPage.PokeSelectView)}>
                <img src="resource/image/UI/select.svg"/>
                <p className="vbox width10 sFontSize">Select</p>

              </button>
              <button className="sidebar" onClick={this.handlePageTabClick.bind(UIAct.UI_BodyPage.RadarView)}>
                <img src="resource/image/UI/radar.svg"/>
                <p className="vbox width10 sFontSize">Graphic</p>

              </button>

              <button className="sidebar" onClick={this.handlePageTabClick.bind(UIAct.UI_BodyPage.LOG)}>
                <p className="vbox width10 sFontSize">LOG</p>

              </button>
            </BASE_COM.CardFrameWarp>
      );
    }
}

class MenuComponent extends React.Component{

    constructor(props) {
      super(props);
      this.state =Store.getState();
    }

    componentWillMount()
    {
      this.unSubscribe=Store.subscribe(()=>
      {
          this.setState(Store.getState().UIData);
      });
    }
    componentWillUnmount()
    {
      this.unSubscribe();
      this.unSubscribe=null;
    }
    handleDropDownClick(event,caller) {

      Store.dispatch(UIAct.UIACT_SetMENU_EXPEND(!Store.getState().UIData.MENU_EXPEND))
      //this.setState({ifShowDropDown:!this.state.ifShowDropDown});
    }

    shouldComponentUpdate(nextProps, nextState) {

      return this.state!=nextState;
    }


    handlePageTabClick(){
      console.log(">>>");
      Store.dispatch(UIAct.UIACT_SwitchBodyPage(this));
    }
    render() {
      let currentPage=this.state.bodyPage;

      let sysAPPBtnShiftStyle=
      {
        transform:(currentPage==UIAct.UI_BodyPage.RadarView)?"translateY(0%)":"translateY(-100%)"
      }

      return(
        <BASE_COM.CardFrameWarp addClass={this.props.className} fixedFrame={true}>
          <div className=" HXF width8 robotoFont lred vbox">
            rrrr
          </div>
          <BASE_COM.Button
            addClass="lgreen HXF width4"
            text="..."
            onClick={this.handleDropDownClick}/>
        </BASE_COM.CardFrameWarp>
      );
    }
}

class PreLogComponent extends React.Component{

  constructor(props) {
      super(props);
      this.state =Store.getState();
  }
  componentWillMount()
  {
    this.unSubscribe=Store.subscribe(()=>
    {
        this.setState(Store.getState());
    });
  }
  componentWillUnmount()
  {
    this.unSubscribe();
    this.unSubscribe=null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.sysData!=nextState.sysData;
  }
  render() {
    //console.log(JSON.stringify(Store.getState()));
    return(
    <BASE_COM.CardFrameWarp addClass={this.props.addClass} fixedFrame={true}>

      <button className="lgreen height2" onClick={
        ()=>{
            WebViewIfAPI.SetOrientationEnable(true);
        }}>ddd</button>
      <pre className="height10 textarea" >
        {JSON.stringify(this.state.sysData.system_log,null,4)}
      </pre>
    </BASE_COM.CardFrameWarp>);
  }
}

class BodyComponent extends React.Component{

  constructor(props) {
      super(props);
      this.state =Store.getState();
  }
  componentWillMount()
  {
    this.unSubscribe=Store.subscribe(()=>
    {
        this.setState(Store.getState());
    });
  }
  componentWillUnmount()
  {
    this.unSubscribe();
    this.unSubscribe=null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.UIData!=nextState.UIData;
  }
  render() {


    var body = null;
    console.log(this.state.UIData.bodyPage);


    switch(this.state.UIData.bodyPage)
    {
      case UIAct.UI_BodyPage.LOG:
        body= <PreLogComponent  addClass={this.props.addClass}/>
      break;

      case UIAct.UI_BodyPage.RadarView:
      break;

      case UIAct.UI_BodyPage.PokeSelectView:
      break;
    }
    return body;

  }
}

class APPMaster extends React.Component{

  constructor(props) {
      super(props);
      this.state =Store.getState();
  }

  componentWillMount()
  {
    this.unSubscribe=Store.subscribe(()=>
    {
        this.setState(Store.getState());
    });
  }
  componentWillUnmount()
  {
    this.unSubscribe();
    this.unSubscribe=null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.UIData!=nextState.UIData;
  }
  render() {

    console.log("this.state.UIData.showLogoFrame::"+this.state.UIData.showLogoFrame);
    return(

    <div className="HXF">
      <BodyComponent addClass="height10"/>
      <MenuComponent className="height2"/>

      <$CSSTG transitionName = "fadeIn" className="width0">
        {(this.state.UIData.MENU_EXPEND)?<SideControlComponent/>:null}
      </$CSSTG>
    </div>);
  }
}

class APPMasterX extends React.Component{

  constructor(props) {
    super(props);
    this.state={};
    this.state.isStoreInited=false;

    StoreRestorePromise.promise.then((Store)=>{
      this.state.isStoreInited=true;
      this.setState(this.state);
    });
  }

  componentWillMount()
  {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    return(
      <$CSSTG transitionName = "logoFrame" className="HXF">
        {
          (this.state.isStoreInited)?
          <APPMaster key="APP" />:
          <div key="LOGO" className="HXF WXF overlay veleXY logoFrame white">
            <div className="veleXY width6 height6">
              <img className="height8 LOGOImg " src="resource/image/NotiMon.svg"></img>
              <div className="HX0_5"/>
              <div>
                <div className="TitleTextCon showOverFlow HX2">
                  <h className="Title">GO  !!</h>
                  <h className="Title">NOTIMON</h>
                </div>
              </div>

            </div>
          </div>
        }
      </$CSSTG>);
  }
}

ReactDOM.render(<APPMasterX/>,document.getElementById('container'));
