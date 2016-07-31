'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import {ButtonComponent, DropDownComponent,DropDownWarp ,CardFrameWarp} from './component/baseComponent';
import PlayGround from './PlayGround/index';
import Store from './redux/redux';

//import WebViewIf from './WebView_if/Android';

import { Provider, connect } from 'react-redux'

import * as ACT_UI from './redux/actions/ACT_UI';
import {DISP_EVE_UI} from './redux/constant';



let WebViewIf = {};
setTimeout(()=>{
  WebViewIf.ToWeb(JSON.stringify({
    url:"MainIF/SystemStatusChange",
    data:{
      sysUrl:".activity.serviceRunning",
      value:"???"
    }
  }));
},3000);


WebViewIf.ToWeb = (json)=>{
  let obj=JSON.parse(json);

  if(obj.url === "NotiMonServIF/PokemonUpdateNotify")
  {


    WebViewIf.FromWeb(
      JSON.stringify({url:"NotiMonServIF/GET/NearByPokemon"})
    );
    return;
  }

  if(obj.url === "NotiMonServIF/GET/NearByPokemon/RSP")
  {
    //Store.dispatch(ACT_UI.UIACT_SetInputBar(obj.data.pokemon.length));
    return;
  }

  if(obj.url === "MainIF/SystemStatusChange")
  {

    if(obj.data.sysUrl.indexOf(".activity")==0)
    {
      Store.dispatch(ACT_UI.UIACT_SystemChange(obj.data));
    }
    switch(obj.data.sysUrl)
    {
      case ".activity.serviceRunning":
        Store.dispatch(ACT_UI.UIACT_SetInputBar(obj.data.sysUrl));

    }
    console.log("@@@@@@@@"+json);
    return;
  }
};


class DropDownXComponent extends React.Component{

    constructor(props) {
      super(props);
      this.state =Store.getState();
    }


    componentWillMount()
    {
      Store.subscribe(()=>
      {
          this.setState(Store.getState());
      });
    }

    shouldComponentUpdate(nextProps, nextState) {

      return true;
    }
    render() {
      return(
            <CardFrameWarp boxShadow="1px 2px 20px #333" >
              <h className="vbox textAlignLeft">fff</h>
              <ButtonComponent
                addClass="HXF lgreen"
                text="..."/>
            </CardFrameWarp>
      );
    }
}


class MenuComponent extends React.Component{

    constructor(props) {
      super(props);
      this.state =Store.getState();
    }

    handleKey(e) {
      if (e.charCode == '\r') {
        console.log('Enter... (KeyPress, use charCode)');
      }
    }

    componentWillMount()
    {
      Store.subscribe(()=>
      {
          this.setState(Store.getState());
      });
    }

    handleDropDownClick(event,caller) {

      Store.dispatch(ACT_UI.UIACT_SetMENU_EXPEND(!Store.getState().UIData[DISP_EVE_UI.MENU_EXPEND]))
      //this.setState({ifShowDropDown:!this.state.ifShowDropDown});
    }

    shouldComponentUpdate(nextProps, nextState) {

      return true;
    }
    render() {
      return(
        <div className="showOverFlow">

          <DropDownWarp
            containerClass={"width2"}
            ifShowDropDown={this.state.UIData[DISP_EVE_UI.MENU_EXPEND]}
            dropdownClass="aniFlipin"
            dropdownStyle={{width:"500px"}}>
            <ButtonComponent
              addClass="lgreen"
              text="..."
              onClick={this.handleDropDownClick}/>
            <DropDownXComponent/>
          </DropDownWarp>



          <input
            className="width8"
            onKeyPress={this.handleKey}
            value={this.state.UIData[DISP_EVE_UI.INPUT_BAR]}/>
          <ButtonComponent
            addClass="width2 black"
            text="Button0"
            onClick={this.handleClick}/>
        </div>
      );
    }
}
class ComponentGroup extends React.Component{


    constructor(props) {
        super(props);
        this.state =Store.getState();
    }
    onClick(event,info)
    {
    }
    ControlServiceOnOff(enable) {
      WebViewIf.FromWeb(JSON.stringify({url:"MainIF/NotiMonService/enable/"+enable}));
    }

    componentWillMount()
    {

    }
    render() {

        return(
          <div className={this.props.className}>
            <button className="width6 HXF" onClick={()=>this.ControlServiceOnOff(true)}>ON</button>
            <button className="width6 HXF" onClick={()=>this.ControlServiceOnOff(false)}>OFF</button>
          </div>
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
    Store.subscribe(()=>
    {
        this.setState(Store.getState());
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    let className=("textarea "+ this.props.addClass);
    return <pre className={className} >
      {JSON.stringify(this.state.UIData[DISP_EVE_UI.UPDATE_SYS_CHANGE].value)}
    </pre>;
  }
}

ReactDOM.render( 
<Provider store={Store}>
  <div  className="blockS HXF">
    <div className="HX2 white">
      <img
        className="width8 HXF widthF800"
        src="resource/image/BLOG_T.svg">
      </img>
    </div>
    <CardFrameWarp>
      <MenuComponent/>
      <ComponentGroup className="widthF800"/>
    </CardFrameWarp>

    <CardFrameWarp>
      <PreLogComponent addClass="HX7"/>
    </CardFrameWarp>
  </div>
</Provider>,
  document.getElementById('container')
);
