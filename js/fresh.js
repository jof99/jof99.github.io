
//import React from "react";
//import ReactDOM from "react-dom";

class Checkbox extends React.Component { 
// the state 
    state =  {
        checked:false
    }

    constructor(props){
        super(props);
        this.handleChecked = this.handleChecked.bind(this);
    }
// Toggles the value of the 'checked' state property between true and false
    handleChecked() {
        this.setState({checked: !this.state.checked})
    }
// this function renders the text and button on the document with logic to change the text based on the state
    render() { 
        var msg;
                if(this.state.checked) {
                    msg = 'checked'
                } else {
                    msg = 'unchecked'
                }
        return(
            <div>
                <input type="checkbox" onChange={this.handleChecked} defaultChecked={this.state.checked}/>
                <h3>The checkbox is {msg}</h3>
            </div>
        )
    }
}

//ReactDOM.render(<Checkbox />,document.getElementById('checkbox'));

class Board extends React.Component {

    
    state = {
      comments: [
      ]
    }

    addComment=(text) => {
        var arr = this.state.comments;
        arr.push(text);
        this.setState({comments: arr})
    }

    removeComment = (i) => {
        console.log('Removing Comment ' + i);
        var arr = this.state.comments;
        arr.splice(i, 1);
        this.setState({comments: arr})
    }

    updateComment = (newText, i) => {
        console.log('Updating Comment');
        var arr = this.state.comments;
        arr[i] = newText;
        this.setState({comments: arr})
    }

    eachComment = (text, i) => {
      return (
        <Comment key={i} index={i} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment}>{text}</Comment>
      )
    }
  
    render() {
      return (
        <div>
            <button onClick={this.addComment.bind(null,'Default Text')} className="add-new-button">Add New</button>
            <div className="boarder">
                {this.state.comments.map(this.eachComment)}
            </div>
        </div>
      )
    }
  }
class Comment extends React.Component { 

    state = {
        editting: false
    }
    constructor(props){
        super(props);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
    }
    save = () =>  { 
        this.props.updateCommentText(this.refs.newText.value,this.props.index);
        this.setState({editting: false})
        
        
        
    }
    edit () {
        this.setState({editting: true})
    }
    remove () {
        console.log('Deleting Comment');
        this.props.deleteFromBoard(this.props.index)
    }
   renderNormal () { 
        return(
            <div className="commentContainer">
                <div className="light-blue-background">{this.props.children}</div>
                    <button onClick={this.edit} className="red-button">Edit</button>
                    <button onClick={this.remove}className="blue-button">Delete</button>
   
            </div>
        ) 
    }
   renderForm () { 
            return(
                <div className="commentContainer">
                        <textarea ref="newText" defaultValue={this.props.children}></textarea>
                        <button onClick={this.save}  className="yellow-button">Save</button>
                </div>
        )     
            } 
    render () {
        if(this.state.editting) { 
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }      
}

ReactDOM.render(<Board />,document.getElementById('container'));