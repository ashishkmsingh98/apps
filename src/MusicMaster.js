import React,{Component} from 'react';
import Artist from './Artist';
import Track from './Track'
import Header from './Header'
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class MusicMaster extends Component{
  state={
    artistQuery:'',
    artist:null,
    tracks:[],
    time: new Date().toLocaleString()
  }
  updatedArtisQuery = event => {
    this.setState({
      artistQuery:event.target.value
      });   
  }
  handlekey = event=> {
    if(event.key === 'Enter'){
      this.searchArtist();
    }
  }
  
  searchArtist = () => {      
      fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
      .then(Response => Response.json())
      .then(json => {
          if(json.artists.total > 0){
          const artist = json.artists.items[0];
          this.setState({artist});
          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
          .then(Response => Response.json())
          .then(json => {
              this.setState ({
                  tracks:json.tracks
              });
          })
          .catch(error=>alert(error.message))
        }
        
    })
    .catch(error =>alert(error.message))
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

tick() {
  this.setState({
    time: new Date().toLocaleString()
  });
}
   render(){
    
     return(
         <div className='btns'>
           <Header/>
        <h1 className='musicMaster'>Music Master</h1>
        <p>{this.state.time}</p>
        <input
        className='search'
        onChange={this.updatedArtisQuery}
        onKeyPress={this.handlekey}
        placeholder={"Enter your favourite artist"}
        />
        <button onClick={this.searchArtist}>Search</button>
         <Artist artist={this.state.artist} />
         <Track tracks={this.state.tracks}/>
         </div>
           )
     }

}

export default MusicMaster;
