import React, {Component} from 'react';
import Header from './Header';

const Joke = ({joke}) => {
const { setup,punchline} = joke;
return <p>{setup} <em>{punchline}</em></p>
}

class Jokes extends Component{
state={    
    joke:{},jokes :[]
}
fetchJokes=()=>{
    fetch('https://official-joke-api.appspot.com/random_ten')
    .then(response => response.json())
    .then(json => this.setState({
        jokes:json
    }))
    .catch(error => alert(error.message))
}
componentDidMount(){
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(json=>this.setState({
        joke:json
    }))
    .catch(error => alert(error.message));
}

render(){
    return(
        <div className='btns'><Header />
        <div className='jumbotron'>
            
            <h2>Highlighted Joke of the day</h2>
            <Joke joke={this.state.joke}/><hr/>
            <button onClick={this.fetchJokes}>Load more</button>
            {this.state.jokes.map(joke =>(<Joke key={joke.id} joke={joke}/>))}
        </div></div>
           )
}
}
export default Jokes;