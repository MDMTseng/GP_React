'use strict'

let PG={};

import React from 'react';
import ReactDOM from 'react-dom';
import {DISP_EVE_UI} from './constant';
import {ButtonComponent, DropDownComponent,DropDownWarp ,CardFrameWarp} from './component/baseComponent';
import {Dispacher} from './framework/Dispacher';
import PlayGround from './PlayGround/index';

import {UIStore} from './framework/store/UIStore';

import {EventEmitter} from 'events';

class MenuComponent extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      ifShowDropDown:false,
      dropMenu:
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
      },
    ]};

    }
    handleKey(e) {
      if (e.charCode == '\r') {
        console.log('Enter... (KeyPress, use charCode)');
      }
    }

    componentWillMount()
    {
      UIStore.addListener(()=>{
        this.setState(UIStore.GetAll());
      });
      //console.log(X2);
    }
    handleClick(event,caller) {
      Dispacher.dispatch(DISP_EVE_UI.UI_Flush,null);
      //Dispacher.dispatch(DISP_EVE_UI.MENU_CLICKED,{time:new Date().getTime()});
    }

    handleDropDownClick(event,caller) {
      Dispacher.dispatch(DISP_EVE_UI.MENU_CLICKED,!UIStore.GetAll()[DISP_EVE_UI.MENU_CLICKED]);
      //Dispacher.dispatch(DISP_EVE_UI.MENU_CLICKED,{time:new Date().getTime()});
      //this.setState({ifShowDropDown:!this.state.ifShowDropDown});
      //Dispacher.dispatch(DISP_EVE_UI.MENU_CLICKED,caller);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
    render() {
      return(
        <div className="blockS showOverFlow">
          <DropDownComponent
            className="width2"
            dropMenu={this.state.dropMenu}
            ifShowDropDown={this.state.ifShowDropDown}
            onClick={(event,caller)=>this.handleDropDownClick(event,caller)}
            />
          <input
            className="blockS width8"
            onKeyPress={this.handleKey}/>
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
  ,
  document.getElementById('container')
);
