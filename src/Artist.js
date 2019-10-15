import React from 'react';

const Artist = ({artist}) => {
 if (!artist) return null;   
 const {images,name,followers,genres} = artist;
 return (
     
     <div>
         <h2>{name}</h2>
         <p>{followers.total} followers</p>
         <p style={{textTransform: 'capitalize'}}> Genres: {genres.join(', ')}</p>
         <img 
          src={images[0] && images[0].url}
          alt='artist-portfolio'
          style={{height:200,width:200,borderRadius:100,objectFit:'cover'}}
          />
     </div>
 )
}

export default Artist;