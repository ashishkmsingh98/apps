import React,{ Component } from 'react';
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherCss.css'
class WeatherApp extends Component{
    state={
        temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:undefined
    }
    getWeaherdata = async(e) => {
        e.preventDefault();
        const City = e.target.elements.city.value;
        const Country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${City},${Country}&APPID=b7aaa3a349294d5706002e82df3de1ea&units=metric`);
        const data = await api_call.json();
        console.log(data);
        if(City && Country)
        {
        this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:""
        });
    }
        else{
            this.setState({
                temperature:undefined,
                city:undefined,
                country:undefined,
                humidity:undefined,
                description:undefined,
                error:'Please enter country and city '
            })
        }
}

    render(){ return  <div className='btns'>
        <Header />
        <div className='wrapper'>
        <div className='main'>
        <div className='container'>
        <div className='row'>
        <div className='col-5 title-container'>
        <h2 className="title-container__title">Weather Finder</h2>
        <p className="title-container__subtitle">Helps you to find weather of cities</p>
        </div>
        <div className='col-7 form-container weather__info'>
        <form onSubmit={this.getWeaherdata}>
                <input type = 'text' placeholder='Country...' name='country' />
                <input type = 'text' placeholder='City...' name='city' />
                <button>Get Weather</button>
            </form><hr/>
            {this.state.city && this.state.country && <p className='weather__key'>Location: {this.state.city},{this.state.country}</p>}
            {this.state.temperature && <p className='weather__key'>Temperature: {this.state.temperature} deg C</p>}{this.state.description &&
            <p className='weather__key' style={{textTransform: 'capitalize'}}>Description: {this.state.description}</p>}
            {this.state.humidity && <p className='weather__key'>Humidity: {this.state.humidity}</p>}
            {this.state.error && <p className='weather__key'>{this.state.error}</p>}
        </div> 
        </div>
        </div>
        </div>
        </div>
    </div>
        
    }    
}

export default WeatherApp;