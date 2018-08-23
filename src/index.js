import React, {Component} from 'react'
import ReactDOM, {render} from 'react-dom'
import axios from 'axios'

class Root extends Component {
  constructor(){
  	super();
  	this.state = {
  	  users: [],
  	  all: true
  	}
  	this.controlButton=this.controlButton.bind(this);
  }

  controlButton(){
  	this.setState({all:!this.state.all})
  }
  
  componentDidMount(){
  	axios.get('/api/users')
  	.then((response)=>{
  	  this.setState({users:response.data})
  	})
  }

  render(){
  	const whoIsShown = this.state.all ? 'Only Show Users With Things' : 'Show All Users';
    return (
  	  <div>
  	    <a style={{
			border: 'solid 1px black',
		    borderRadius: '3px',
		    padding: '5px',
		    backgroundColor: '#333',
		    color: '#fff',
		    display: 'block',
		    textAlign: 'center',
		    cursor: 'pointer',
  	    }} onClick={()=>{this.controlButton()}}>{whoIsShown}</a>
  	    <UserThings users={this.state.users} all={this.state.all} button={this.controlButton}/>
  	  </div>
    )
  }
}

function UserThings({users, button, all}){
  const shown = all ? users.map((user)=>{ return( <User key={user.id} user={user} button={button}/>)}) : 
    users.map((user)=>{ 
    	if(user.things.length)
    	return( <User key={user.id} user={user} button={button}/>)})
  return(
  	<div className ='user-list' style={{
  	  	margin: '15px 0px 15px 0px',
  	  	display: 'flex',
  	  	justifyContent:'space-around'
  	  }}>
      {shown}
  	</div>
  )
}

function User({user, button}) {
  const {things} = user;
  return (
    <div style={{
      backgroundColor: 'Grey',
      borderRadius: '50%',
      width: '130px',
      height: '160px',
      textAlign: 'center'
    }}>
    <h2>{user.name}</h2>
    {things.map((thing)=>{
      return(<Thing key={thing.id} name={thing.name}/>)
    })}
    </div>
  )
}

function Thing({name}){
  return(
    <h3>{name}</h3>
  )
}

render(<Root />, document.getElementById('root'))