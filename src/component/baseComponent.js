import React from 'react';
var CardFrameWarp = React.createClass({


  getDefaultProps: function() {
    return {
      boxShadow:"1px 2px 10px #000",
      addClass: "",
    };

  },
  render: function() {
    return(
      <div className={"blockS HXA padding showOverFlow"+ this.props.addClass}>
        <div
          className="blockS HXA white padding showOverFlow"
          style={{boxShadow:this.props.boxShadow}} >

          <div className="blockS HXA showOverFlow">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

var DropDownWarp = React.createClass({

  render: function() {
    var dropDownClassName="blockS HXA dropDownContent "+(this.props.ifShowDropDown?"":"hide ")+this.props.dropdownClass;
    return(
      <div className={"blockS dropDown "+ this.props.containerClass} >
        {this.props.children[0]}

        <div

          className={dropDownClassName}
          style={this.props.dropdownStyle}>
          {this.props.children.slice(1,this.props.children.length)}

        </div>
      </div>
    );
  }
});

var DropDownComponent = React.createClass({

  getInitialState: function() {
    return {
      ifShowDropDown:false
    };
  },


  handleClick: function(event,caller) {
    this.props.onClick(event,caller);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  render: function() {
    var rows = [];

    for( var menu_sec of this.props.dropMenu){


      var group = [];

      for( var ele of menu_sec.ele){
        group.push(
          <ButtonComponent
            addClass=" textAlignLeft dropDownBtn"
            key={ele.id}
            id={ele.id}
            text={ele.text}
            onClick={menu_sec.callBack}/>
        );
      }


      var classX="blockS black HX"+menu_sec.ele.length+" ";


      rows.push(
        <div  key={menu_sec.id+"_div"}>
          <div
            key={menu_sec.text}
            className={classX+"width1 rotateContent"}>

            <p>
              {menu_sec.text}
            </p>

          </div>
          <div
            key={menu_sec.id+"_block"}
            className={classX+"width11"}>
            {group}
          </div>

        </div>
      );

      rows.push(
        <div
          key={menu_sec.id+"_"}
          className="blockS black HX0_1 ">
        </div>
      );

    }



    var divStyle = {width:'300px'};
    return(
      <DropDownWarp
        containerClass={this.props.className}
        ifShowDropDown={this.props.ifShowDropDown}
        dropdownClass="aniFlipin"
        dropdownStyle={divStyle}>
        <ButtonComponent
          addClass="HXF lgreen"
          text="..."
          onClick={this.handleClick}/>
        <CardFrameWarp boxShadow="1px 2px 20px #333">
          {rows}
        </CardFrameWarp>
      </DropDownWarp>
    );
  }
});



var ButtonComponent = React.createClass({

  getInitialState: function() {
    return {};
  },
  handleClick: function(event) {
    this.props.onClick(event,this);
  },
  render: function() {
    var className=("blockS lgray vbox "+ this.props.addClass);
    return <button
      onClick={this.handleClick}
      className={className}>
      <p>
        {this.props.text}
      </p>
    </button>;
  }
});

export { ButtonComponent, DropDownComponent,DropDownWarp ,CardFrameWarp}
