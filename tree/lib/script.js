"use strict";

var TreeListingComponent = React.createClass({
    displayName: "TreeListingComponent",

    getInitialState: function getInitialState() {
        return {
            showContents: {}
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            level: 0
        };
    },

    handleClick: function handleClick(event, srcObj) {
        var tmpobj = {};
        if (this.state.showContents[srcObj.props.conID] == true || this.state.showContents[srcObj.props.conID] == false) this.state.showContents[srcObj.props.conID] = !this.state.showContents[srcObj.props.conID];else this.state.showContents[srcObj.props.conID] = true;

        this.setState({
            showContents: this.state.showContents
        });
    },
    loadContent: function loadContent(dirTreeObjArr) {
        var treeDOM = [];

        for (var i = 0; i < dirTreeObjArr.length; i++) {
            var fullPath = this.props.pathPadding + dirTreeObjArr[i].name;
            if (dirTreeObjArr[i].type === "directory") {
                var btnID = "A" + i;
                treeDOM.push(React.createElement(ButtonComponent, { addClass: "lred textAlignLeft", key: fullPath, conID: btnID, onClick: this.handleClick, text: dirTreeObjArr[i].name }));
                if (this.state.showContents[btnID] == true) treeDOM.push(React.createElement(TreeListingComponent, { pathPadding: fullPath + "/", key: "$Sub:" + fullPath, level: this.props.level + 1, DirTree: dirTreeObjArr[i].contents }));
            } else if (dirTreeObjArr[i].type === "file") treeDOM.push(React.createElement(
                "a",
                { key: fullPath, href: fullPath, className: "blockS darkColor lgray textAlignLeft" },
                dirTreeObjArr[i].name,
                " "
            ));
        }

        return treeDOM;
    },

    render: function render() {
        var content = this.props.DirTree;
        return React.createElement(
            "div",
            { className: this.props.addClass },
            this.loadContent(content)
        );
    }
});
var DirStructAPP = React.createClass({
    displayName: "DirStructAPP",


    getInitialState: function getInitialState() {
        return { dirList: null };
    },
    getDirList: function getDirList(dirList) {
        this.state.dirList = dirList;
    },
    loadJson: function loadJson(url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.state.dirList = JSON.parse(xhttp.responseText);
                this.setState(this.state);
            }
        }.bind(this);
        xhttp.open("GET", url, true);
        xhttp.send();
    },
    componentWillMount: function componentWillMount() {
        this.loadJson("../dirTree.json");
    },
    render: function render() {
        if (this.state.dirList != null) return React.createElement(TreeListingComponent, { pathPadding: "../", addClass: "", DirTree: this.state.dirList[0].contents });else return null;
    }
});

ReactDOM.render(React.createElement(DirStructAPP, null), document.getElementById('container'));