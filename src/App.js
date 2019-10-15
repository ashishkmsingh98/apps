import React,{ Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component{

  constructor(props){
    super(props);
      this.state = {
        users: [],
        loading: false
      };    
      //bind
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({
      loading : true
    })
    axios('https://uinames.com/api/?amount=5')
    .then(Response => this.setState({
      users : [...this.state.users,...Response.data],
      loading : false
    })
    );
  }
  handleSubmit(e){
    e.preventDefault();
    this.getUsers();
    console.log('more users loaded')

  }
  UNSAFE_componentWillMount(){    
    this.getUsers();
  }
  render(){
    return <div className="App">
    <form onSubmit={this.handleSubmit}>
             <input type="submit" value = "load users" />
           </form><hr/>
    {!this.state.loading ? (this.state.users.map(users =>(
      <div>
           <h3>{users.name}</h3>
           <p>{users.region}</p>
           <p>{users.gender}</p>
           <hr/>           
      </div>
      ))) : (<Loading message="Loading data" />)}</div>
  }
}

export default App;
