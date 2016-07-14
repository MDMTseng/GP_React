
var TreeListingComponent = React.createClass({
  getInitialState: function() {
    return {
        showContents:{}
    };
    
  },
  getDefaultProps: function() {
    return {
        level:0
    };
    
  },
  
  handleClick: function(event,srcObj) {
    var tmpobj={};
    if(this.state.showContents[srcObj.props.conID]==true||this.state.showContents[srcObj.props.conID]==false)
        this.state.showContents[srcObj.props.conID]=!this.state.showContents[srcObj.props.conID];
    else
        this.state.showContents[srcObj.props.conID]=true;
    
    this.setState(
        {
            showContents:this.state.showContents
        }
    );
  },
  loadContent: function(dirTreeObjArr) {
    var treeDOM=[];
    
    for(var i=0;i<dirTreeObjArr.length;i++)
    {
        var fullPath=this.props.pathPadding+dirTreeObjArr[i].name;
        if(dirTreeObjArr[i].type==="directory")
        {
            var btnID="A"+i;
            treeDOM.push(<ButtonComponent addClass="lred textAlignLeft" key={fullPath} conID={btnID} onClick={this.handleClick} text={dirTreeObjArr[i].name} />);
            if(this.state.showContents[btnID]==true)
                treeDOM.push(<TreeListingComponent pathPadding={fullPath+"/"} key={"$Sub:"+fullPath} level={this.props.level+1} DirTree={dirTreeObjArr[i].contents}/>);
        }
        else if(dirTreeObjArr[i].type==="file")
            treeDOM.push(<a key={fullPath} href={fullPath} className="blockS darkColor lgray textAlignLeft">{dirTreeObjArr[i].name} </a>);
    }
    
    return treeDOM;
  }
  ,
  render: function() {
   var content=this.props.DirTree;
    return(
        <div className={this.props.addClass}>
            {this.loadContent(content)}
        </div>
    );
  }
});
var DirStructAPP= React.createClass({
  
    getInitialState: function() {
        return {dirList:null};
    },
    getDirList: function(dirList) {
        this.state.dirList=dirList;
    },
    loadJson:function(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.state.dirList= JSON.parse(xhttp.responseText);
                this.setState(this.state);
            }
        }.bind(this);
        xhttp.open("GET", url, true);
        xhttp.send();
    },
    componentWillMount:function()
	{
		this.loadJson("../dirTree.json");
	},
   render: function() {
       if(this.state.dirList!=null)
            return(<TreeListingComponent pathPadding="../" addClass="" DirTree={this.state.dirList[0].contents}/>);
       else
            return null;
   }
});

ReactDOM.render(
  
    <DirStructAPP/>
  	,
  document.getElementById('container')
);