import React, {Component} from 'react';

class Track extends Component{
    state = {
        playing:false,
        audio : null,
        playPreviewUrl:null
    }
    playAudio = previewUrl => () => {
        const audio = new Audio(previewUrl);
        if(!this.state.playing){
        audio.play();
        this.setState({playing:true,audio,playPreviewUrl:previewUrl});
        }
        else {
            this.state.audio.pause();
            if(this.state.playPreviewUrl === previewUrl){
            this.setState({playing:false});
             }
            else {
                audio.play();
                this.setState({audio,playPreviewUrl:previewUrl})
            } 
            }
    }
    render(){
        const {tracks} = this.props;
        return (
           
               <div>
                   {
                      tracks.map(track => {
                      const {id,name,album,preview_url} = track;
                      return(
                          <div key={id} onClick={this.playAudio(preview_url)} className="track">
                            <img src={album.images[0].url} alt='track-img' className='track-img'></img>
                            <p className='track-text'>{name}</p>
                          </div>
                      )
                      })
                        
                   }
               </div>
           
        )
    }
}

export default Track;