import React from 'react';
import {Link} from 'react-router-dom';
const Header =() =>{
    const style1 ={
     display:'inline-block',
     margin:10,
     marginBottom: 30 
    };
return(
<div>
<h3 style={style1}><Link to='/'>News App</Link></h3>
<h3 style={style1}><Link to='/jokes'>Jokes</Link></h3>
<h3 style={style1}><Link to='/musicmaster'>Music Master</Link></h3>
<h3 style={style1}><Link to='/weatherapp'>Weather App</Link></h3>
</div>
)
}
export default Header;