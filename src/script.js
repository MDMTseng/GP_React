'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import {ButtonComponent, DropDownComponent,DropDownWarp ,CardFrameWarp} from './component/baseComponent';
import PlayGround from './PlayGround/index';
import Store from './redux/redux';
import * as ACT_UI from './redux/actions/ACT_UI';

class MenuComponent extends React.Component{

    constructor(props) {

      Store.subscribe(()=>
      {
          console.log(Store.getState().calcData.ans);

          this.setState(this.state);
      });
      Store.dispatch({type: "SET",data:10000})

      super(props);
      this.state = {
        calcData:Store.getState().calcData
      };
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
    }
    handleClick(event,caller) {
          //Store.dispatch({type: "DIV",data:1.01})
      //Dispacher.dispatch(DISP_EVE_UI.MENU_CLICKED,{time:new Date().getTime()});
    }

    handleDropDownClick(event,caller) {


      Store.dispatch(ACT_UI.UIACT_SetMENU_EXPEND(true))
      //this.setState({ifShowDropDown:!this.state.ifShowDropDown});
    }

    shouldComponentUpdate(nextProps, nextState) {

      return nextState!=this.state;
    }
    render() {
      return(
        <div className="blockS showOverFlow">
          <DropDownComponent
            className="width2"
            dropMenu={this.dropMenu}
            ifShowDropDown={this.state.ifShowDropDown}
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
