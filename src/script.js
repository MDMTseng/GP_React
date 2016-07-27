'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import {ButtonComponent, DropDownComponent,DropDownWarp ,CardFrameWarp} from './component/baseComponent';
import PlayGround from './PlayGround/index';
import Store from './redux/redux';


import { Provider, connect } from 'react-redux'

import * as ACT_UI from './redux/actions/ACT_UI';
import {DISP_EVE_UI} from './redux/constant';

class MenuComponent extends React.Component{

    constructor(props) {
      super(props);
      this.state =Store.getState();
      this.dropMenu =
        [{
          id:"MAIN",
          text:"MAIN",
          ele:[
          {
            id:"new FILE",
            text:"new file",
          },
          {
            id:"save",
            text:"save",
          }],
          callBack:this.handleClick
        },
        {
          id:"STEP",
          text:"STEP",
          ele:[{
            id:"prev",
            text:"prev",
          },
          {
            id:"next",
            text:"next",
          }],
          callBack:this.handleClick
        },
        {
          id:"OPS",
          text:"OPS",
          ele:[{
            id:"recent files",
            text:"recent files",
          },
          {
            id:"recent prj",
            text:"recent prj",
          }],
          callBack:this.handleClick
        }];
        this.UIUpdate=false;
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
          console.log(Store.getState());
          this.setState(Store.getState());
      });
    }

    handleClick(event,caller) {
    }

    handleDropDownClick(event,caller) {

      WebViewIf.showToast(">>>>");
      Store.dispatch(ACT_UI.UIACT_SetMENU_EXPEND(!Store.getState().UIData[DISP_EVE_UI.MENU_EXPEND]))
      //this.setState({ifShowDropDown:!this.state.ifShowDropDown});
    }

    shouldComponentUpdate(nextProps, nextState) {

      return true;
    }
    render() {
      return(
        <div className="blockS showOverFlow">
          <DropDownComponent
            className="width2"
            dropMenu={this.dropMenu}
            ifShowDropDown={this.state.UIData[DISP_EVE_UI.MENU_EXPEND]}
            onClick={this.handleDropDownClick.bind(this)}
            />
          <input
            className="blockS width8"
            onKeyPress={this.handleKey}
            value={this.state.calcData.ans}/>
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
        this.state ={};
    }
    onClick(event,info)
    {
    }
    handleClick(event) {

    }
    componentWillMount()
    {

    }
    render() {

        return(
          <div className={this.props.className}>
            <button className="blockS width6 HXF">B1</button>
            <button className="blockS width6 HXF">B2</button>
          </div>
        );
    }
}


ReactDOM.render(
<Provider store={Store}>
  <div  className="blockS HXF">
    <div className="blockS HX2 white">
      <img
        className="blockS width8 HXF widthF800"
        src="resource/image/BLOG_T.svg">
      </img>
    </div>
    <CardFrameWarp>
      <MenuComponent/>
    </CardFrameWarp>
    <CardFrameWarp>
      <ComponentGroup className="blockS HX7 widthF800"/>
    </CardFrameWarp>
  </div>
</Provider>,
  document.getElementById('container')
);
